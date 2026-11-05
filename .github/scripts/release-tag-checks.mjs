import assert from 'node:assert/strict';
import test from 'node:test';
import { ensureReleaseTag } from './release-tag.mjs';

const sha = 'a'.repeat(40);
const tagSha = 'b'.repeat(40);
const defaults = {
    version: '0.45.3',
    sha,
    repository: 'prezly/content-renderer-react-js',
    token: 'test',
};
function mock(responses) {
    const calls = [];
    return {
        calls,
        request: async (url, options) => {
            calls.push({
                path: url.split('/git/')[1],
                method: options.method,
                body: options.body && JSON.parse(options.body),
            });
            assert(responses.length, 'Unexpected API request');
            const [status, data] = responses.shift();
            return { status, ok: status >= 200 && status < 300, json: async () => data };
        },
    };
}
test('dry-run tag check never writes', async () => {
    const api = mock([[404]]);
    await ensureReleaseTag({ ...defaults, ...api, mode: 'check' });
    assert.deepEqual(api.calls, [{ path: 'ref/tags/v0.45.3', method: 'GET', body: undefined }]);
});
test('creates only the version tag as an annotated tag at the release commit', async () => {
    const api = mock([
        [404],
        [201, { sha: tagSha }],
        [201, {}],
        [200, { object: { type: 'tag', sha: tagSha } }],
    ]);
    await ensureReleaseTag({ ...defaults, ...api, mode: 'create' });
    assert.deepEqual(
        api.calls.filter((call) => call.method === 'POST'),
        [
            {
                path: 'tags',
                method: 'POST',
                body: { tag: 'v0.45.3', message: 'v0.45.3', object: sha, type: 'commit' },
            },
            { path: 'refs', method: 'POST', body: { ref: 'refs/tags/v0.45.3', sha: tagSha } },
        ],
    );
});
for (const type of ['commit', 'tag']) {
    test(`retry preserves an existing ${type} tag at the same commit`, async () => {
        const responses = [[200, { object: { type, sha: type === 'tag' ? tagSha : sha } }]];
        if (type === 'tag') responses.push([200, { object: { type: 'commit', sha } }]);
        const api = mock(responses);
        await ensureReleaseTag({ ...defaults, ...api, mode: 'create' });
        assert(api.calls.every((call) => call.method === 'GET'));
    });
}
test('rejects an existing tag at a different commit before any write', async () => {
    const api = mock([[200, { object: { type: 'commit', sha: 'c'.repeat(40) } }]]);
    await assert.rejects(
        ensureReleaseTag({ ...defaults, ...api, mode: 'check' }),
        /another commit/,
    );
    assert(api.calls.every((call) => call.method === 'GET'));
});
test('permission errors are not treated as missing tags', async () => {
    const api = mock([[403]]);
    await assert.rejects(ensureReleaseTag({ ...defaults, ...api, mode: 'create' }), /HTTP 403/);
    assert(api.calls.every((call) => call.method === 'GET'));
});
test('a concurrent tag creation fails without overwriting it', async () => {
    const api = mock([[404], [201, { sha: tagSha }], [422]]);
    await assert.rejects(ensureReleaseTag({ ...defaults, ...api, mode: 'create' }), /HTTP 422/);
    assert(!api.calls.some((call) => call.method === 'PATCH'));
});
