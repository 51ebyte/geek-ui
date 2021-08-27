<template>
	<div class="e-picker-time">
		<div class="e-picker-time-panel">
			<div class="e-picker-time-panel-body">
				<div class="e-picker-time-list">
					<ul class="e-picker-time-hours">
						<li v-for="h in 23" :key="h">
							{{h}}
						</li>
					</ul>
				</div>
				<div class="e-picker-time-list">
					<ul class="e-picker-time-minutes">
						<li v-for="m in 59" :key="m">
							{{m}}
						</li>
					</ul>
				</div>
				<div class="e-picker-time-list">
					<ul class="e-picker-time-seconds">
						<li v-for="s in 59" :key="s">
							{{s}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style>
</style>
