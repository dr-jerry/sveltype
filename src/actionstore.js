import { writable } from 'svelte/store';

export const actionStore = writable({});


function createStats() {
	const { subscribe, set, update } = writable({hits: {}, missed: []});

	return {
		subscribe,
		hit: (key) => update(stats => {
            const now = new Date().getTime();
            let delta = stats.lastTime ? now - stats.lastTime : 0;
            let deltas = [delta, ...stats.hits[key] || []];
            return {...stats, lastTime: now, hits: {...stats["hits"], [key]:  deltas}}
        }),
		miss: (pair) => update(stats => {
            return {...stats, missed: [pair, ...stats["missed"]]}
        }),
        init: () => update(stat => {
            let now = new Date().getTime();
            return {...stat, startTime: now, lastTime: now}}),
		reset: () => ({hits: {}, missed: []})
	};
}



export const statStore = createStats();