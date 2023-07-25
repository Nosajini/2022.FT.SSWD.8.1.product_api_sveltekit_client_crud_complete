<script>

	// import required Sveltekit form features
	import { enhance, applyAction } from '$app/forms';

	// Import the store etc.
	import { supportAreas, getAllsupportAreas } from '../../stores/supportStore.js';

	export let data;
	export let form;

		// Refresh the store when page loads (optional due to overhead but probably a good idea)
	export const load = async ({ fetch }) => {

		// Update list of categories (used in form)
		await getAllsupportAreas();

		return {

		}
	}




</script>

<!-- Main Content - Products etc. -->
<div class="container">
	<!-- If the insert was sucessfull display the new product details-->
	{#if form?.success}
		<div class="row">
			<!-- Page Header -->
			<!-- show form message if it -->
			<h2 class="mt-5">{form?.message || ''}</h2>
		</div>

		<div class="row">
			<div class="row mb-3">
				<h6>ID: {form?.support.id || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Support ARea: {form?.support.areaID || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Name: {form?.support.name || ''}</h6>
			</div>
            <div class="row mb-3">
				<h6>E-Mail: {form?.support.email || ''}</h6>
			</div>
			<div class="row mb-3">
				<h6>Description: {form?.support.message || ''}</h6>
            </div>
		</div>
		<!-- else show the form again (very simple error handling - should also show validation errors)-->
	{:else}
		<div class="row">
			<!-- Page Header -->
			<h2 class="mt-5">Raise Support Ticket</h2>
		</div>

		<div class="row">
			<!-- Product Form -->
			<form
			 	method="POST" 
			 	action="?/addproduct"
				 use:enhance={({ form }) => {
					// Before form submission to server
					return async ({ result, update }) => {
						// After form submission to server
						if (result.type === 'success') {
							await applyAction(result);
						}
						if (result.type === 'invalid') {
							await applyAction(result);
						}
						update();
					};
				}}
			 >
				<div class="row mb-3">
					<label for="areaID" class="form-label">Support Area:</label>
					<div class="col-sm-8">
						<select id="category_id" class="form-select" name="category_id">
							<option value="0">Choose a support area</option>
							{#each $supportAreas as area}
								<option value={area.id}>{area.name}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="row mb-3">
					<label for="name" class="form-label">Name:</label>
					<div class="col-sm-8">
						<input 
							id="name" 
							type="text" 
							class="form-control" 
							name="name" 
							value="{form?.support.name || ''}"
						/>
					</div>
                <div class="row mb-3">
                    <label for="email" class="form-label">E-Mail:</label>
                    <div class="col-sm-8">
                        <input 
                            id="email" 
                            type="text" 
                            class="form-control" 
                            name="email" 
                            value="{form?.support.email || ''}" 
                        />
                    </div>
				</div>
				<div class="row mb-3">
					<label for="message" class="form-label">Message:</label>
					<div class="col-sm-8">
						<input
                            id="message"
                            type="text"
                            class="form-control"
                            name="message"
                            value="{form?.support.message || ''}"
					    />
					</div>
				</div>
				<!-- productId is a hidden field value is not required but set = 0-->
				<input id="id" type="hidden" value="0" />
				<div class="mb-3">
					<button type="submit" class="btn btn-primary"> Submit Support Ticket </button>
					<a href="/" class="btn btn-secondary"> Cancel </a>
				</div>

				{#if form?.error}
					<div class="alert alert-danger col-sm-8" role="alert">validation failed: {form?.message}</div>
				{/if}
			</form>
			<!-- End form-->
		</div>
	{/if} <!-- End the if block-->
</div>
