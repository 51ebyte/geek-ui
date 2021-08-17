<template>
	<div class="e-button-group"><slot></slot></div>
</template>

<script>
export default {
	name: 'ButtonGroup'
};
</script>

<style>
.e-button-group .e-button {
	border-radius: 0;
	margin-left: 0px !important;
	position: relative;
	margin-right: 1px;
}

.e-button-group .e-button:first-child {
	border-radius: 2px 0 0 2px;
}
.e-button-group .e-button:last-child {
	border-radius: 0 2px 2px 0;
	margin-right: 0px !important;
}
</style>
