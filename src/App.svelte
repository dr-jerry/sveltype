<script>
	import Intro from './lib/Intro.svelte'
	import ConfigMenu from './lib/ConfigMenu.svelte';
	import { actionStore, statStore } from './lib/actionstore';
	import Course from './lib/Course.svelte';

	let configs = [{id: "en/qwerty", txt : "English / Qwerty"}, {id: "nl/qwerty", txt: "Nederlands / Qwerty"}];
	let theCourse = $state(undefined);
	let courseName = $state("");
	let courseText  = $state("");
	let lang = $state("en");
	let showCourse = (course) => {	   
	   	if (typeof course.course.course_text === "string")
			courseText = course.course.course_text;
		else courseText = course.course.course_text.join(' ');
		theCourse = course;
		courseName = course.course.name;
	   	statStore.reset();
	}
	function handleType(evt) {
		if (theCourse && $statStore.startTime) {
			let now = new Date().getTime();
			if (unicode2key(courseText[0]) === evt.key || theCourse.ignoreError) {
				actionStore.update((as) => ({...as, ...{expected: courseText[0]
					, "typed" : evt.key, focus: courseText[1] || "end", missed: 0 }}));

				courseText = courseText.substr(1);
				statStore.hit(evt.key)
			} else { // missed the key.
				actionStore.update((as) => ({...as, ...{missed: as.missed+1}}));

				statStore.miss({typed: evt.key, missed: unicode2key(courseText[0])});
			}
		} else if (theCourse && evt.key === ' ') { // start the course.
			statStore.init()
		}
	}
	function unicode2key(char) {
        // map the unicode for enter to the enter key.
		if (char === '\u23CE')
			return 'Enter';
		return char;
	}




</script>
<svelte:window on:keypress|preventDefault={ handleType }/>

<main>
	<h1>Learn Touch Typing</h1>
	<p>Build with Svelte 5!</p>
	<div class="nav"><ConfigMenu  showCourse={showCourse} configs={configs} selected={courseName} setLang={(l) => lang=l}/></div>
	{#if theCourse }
  	   <div class="play ground">
	     <Course course={theCourse} courseText={courseText}></Course>
	   </div>	
	{:else}
	   <div class="explanation">
		<Intro language={lang}></Intro>
	   </div>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: #FFFFFF;
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
	.explanation {
		float: left;
		width: 50%;
		text-align: left;
	}
</style>

