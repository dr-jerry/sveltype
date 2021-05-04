<script>
    import{ actionStore, statStore } from './actionstore.js';
	import ODO from './ODO.svelte';
	let configs = [{id: "en/qwerty", txt : "English / Qwerty"}, {id: "nl/qwerty", txt: "Nederlands / Qwerty"}];
	let courseText  = "";
	let course = undefined;
	let courseName = "";
	let nr=0;
	function showCourse(evt) {	   
		course = evt.detail;	   
	   	courseText = course.course.course_text;
		courseName = course.course.name;
	   	statStore.reset();
	}

	function unicode2key(char) {
        // map the unicode for enter to the enter key.
		if (char === '\u23CE')
			return 'Enter';
		return char;
	}

	function handleType(evt) {
		if (course && $statStore.startTime) {
			actionStore.update((as) => ({...as, ...{expected: courseText[0]
				, "typed" : evt.key, focus: courseText[1] || "end" }}));
			let now = new Date().getTime();
			if (unicode2key(courseText[0]) === evt.key || course.ignoreError) {
				courseText = courseText.substr(1);
				statStore.hit(evt.key)
			} else { // missed the key.

				statStore.miss({typed: evt.key, missed: unicode2key(courseText[0])});
			}
		} else if (course && evt.key === ' ') { // start the course.
			statStore.init()
		}
	}
	import ConfigMenu from './ConfigMenu.svelte';
	import Course from './Course.svelte';
</script>

<svelte:window on:keypress|preventDefault={ handleType }/>
<!-- preventDefault is for preventing Firefox' search when pressing a quote. -->
<main>
	<h1>Learn Touch Typing</h1>
	<p>Build with Svelte</p>
	<div class="nav"><ConfigMenu configs={configs} selected={courseName} on:showCourse={showCourse}/></div>
	{#if course}
  	   <div class="play ground">
	     <Course theCourse={course} courseText={courseText}></Course>
	   </div>	
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 1em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	.nav {
	  float: left;
	  width: 25%;
    	  font-size: 0.6em;

	}
	.play.ground {
	  float: right;
	  width: 70%;
	  font-size: 0.6em;
	}
</style>