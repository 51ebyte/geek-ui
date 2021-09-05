<template>
	<div><slot></slot></div>
</template>

<script>
export default {
	name: 'TabsItem',
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		label: {
			type: [String, Function]
		}
	}
};
</script>
