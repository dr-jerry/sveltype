<script> 
    import{ actionstore } from './actionstore.js';
	let configs = [{id: "en/qwerty", txt : "English / Qwerty"}, {id: "nl/qwerty", txt: "Nederlands / Qwerty"}];
	let courseText  = "";
	let course = undefined;
	function showCourse(evt) {
	   course = evt.detail;
	   courseText = course.course.course_text;
	   console.log(JSON.stringify(course));
	}
	function handleType(evt) {
		console.log("handle store " + $actionstore);
		actionstore.update((as) => ({...as, ...{expected: courseText[0]
			, "typed" : evt.key, focus: courseText[1] || "end" }}));
		courseText = courseText.substr(1)
	}
	import ConfigMenu from './ConfigMenu.svelte';
	import Course from './Course.svelte';
	</script>

<svelte:window on:keypress={ handleType }/>
<main>
	<h1>Learn Touch Typing</h1>
	<p>Build with Svelte</p>
	<div class="nav"><ConfigMenu configs={configs} on:showCourse={showCourse}/></div>
	{#if course}
  	   <div class="play ground">
	     <Course theCourse={course} courseText={courseText}></Course>/>
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