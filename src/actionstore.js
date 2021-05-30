import { writable, derived } from 'svelte/store';

export const actionStore = writable({});


function createStats() {
    const initMap = {hits: {}, missed: [], velocity: []}; 
    const veloCount=10;
	const { subscribe, set, update } = writable();

	return {
		subscribe,
		hit: (key) => update(stats => {
            const now = new Date().getTime();
            let delta = stats.lastTime ? now - stats.lastTime : 0;
            let deltas = [delta, ...stats.hits[key] || []];
            return {...stats, lastTime: now
                , hits: {...stats["hits"], [key]:  deltas}
                , velocity: [delta].concat(stats.velocity.slice(0, veloCount-1))}
        }),
		miss: (pair) => update(stats => {
            return {...stats, missed: [pair, ...stats["missed"]]
        }}),
        init: () => update(stats => {
            let now = new Date().getTime();
            return {...stats, startTime: now, lastTime: now, endTime: 0}
        }),
        stop: () => update(stats => {
            let now = new Date().getTime();
            return {...stats, endTime: now}
        }),
		reset: () => set(initMap)
	};
}


// alternative to the derived stores:
// import { get, writable } from 'svelte/store';

// function createCount() {
//     const store = writable(0);

//     return {
//         subscribe: store.subscribe,
//         increment: () => store.update(n => n + 1),
//         decrement: () => store.update(n => n - 1),
//         reset: () => store.set(0),
//         squared: () => {
//             const n = get(store);
//             return n*n;
//         }
//     };
// }

// export const count = createCount();



export const statStore = createStats();

export const errors = derived (
    statStore,
    $statStore => $statStore.missed.length
);
export const velocity = derived (
    statStore,
    $statStore => {
        let velo = $statStore.velocity;
        let n = velo.length;
       if (n > 1) 
            return (1000 * (n+1) * n / 2 / velo.filter(v => v > 0).reduce((acc,head,i) => head*(n-i)+acc, 0)).toFixed(2)
        else
            return 0
    }
);
export const courseLive = derived (
    statStore,
    $statStore => {
        let result = $statStore.startTime > 0 && $statStore.endTime == 0;
        return (result)

    }
);

export const totalHits = derived (
    statStore,
    $statStore => {
        let r = Object.keys($statStore["hits"]).reduce((r,k) => {r += $statStore["hits"][k].length; return r},0);
        return r;
    }
);