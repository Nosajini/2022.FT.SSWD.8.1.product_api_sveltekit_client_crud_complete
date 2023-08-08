<script>
// @ts-nocheck

	// Import the store etc.
	import { supportTickets, supportAreas, getAllsupportTickets } from '../../stores/supportStore';

	// filtered is subscribed to the $tickets store
	// initially filtered is a copy of tickets (from the store)

	$: filtered = $supportTickets;

	// Object to store sort directions
	const table_sort = {
		id: false,
		name: false,
		email: false,
		message: false
	};

	// This function will filter tickets by cat_id
	const filterByArea = async (cat_id = 0) => {
		// Refresh the store to ensure it is up to date (optional)
		await getAllsupportTickets();

		// Filter if we have a cat_id value > 0
		// See https://javascript.info/array-methods#filter
		// Note this filters the existing $ticket store and does not replace it like getProductsByCat()
		if (cat_id > 0) {
			filtered = $supportTickets.filter((p) => {
				return p.supportArea_id == cat_id;
			});
		}
	};

	const sortNumeric = (col = 'product_price') => {

		// reverse current sort direction for this col
		table_sort[col] = !table_sort[col];

		// check browser console for output
		// sort takes a function parameter to indicate which column should be sorted (e.g. product_price) 
		console.log(`${col} : ${table_sort[col]}`);

		// sort the filtered array based on column selected
		filtered = filtered.sort((a, b) => {
			if (table_sort[col] === true) {
				return a[col] - b[col];
			} else {
				return b[col] - a[col];
			}
		});
}

	// Function to delete a ticket by id
	// validate id
	// Ask user to confirm
	// then call API endpoint to delete
	// refresh the view
	const deleteSupportTicket = async (id = 0) => {
		if (confirm(`Permenently deleting support ticket with id= ${id}\n\nAre you sure?`)) {
			console.log(`delete support ticket id: ${id}`);
		}
	};
</script>

<!-- Main Content - Products etc. -->
<div class="container">
	<div class="row">
		<!-- Page Header -->
		<h2 class="mt-5">Support Tickets</h2>
	</div>
	<div class="row">
		<div class="col-sm-2">
			<!-- Page Body Left Column (menu) -->
			<div id="supportAreaList" class="list-group">
				<!-- placeholders - replace with real supportArea links -->
				<button
					on:click={() => filterByArea()}
					class="supportArea-link list-group-item list-group-item-action"
				>
					All Tickets
				</button>
				{#each $supportAreas as area}
					<button
						on:click={() => filterByArea(area.id)}
						class="supportArea-link list-group-item list-group-item-action"
					>
						{area.areaName}
					</button>
				{/each}
			</div>
		</div>
		<!-- End supportArea col -->
		<div class="col-sm-10">
			<!-- Page Body Right Side (Content goes here) -->
			<div id="tickets">
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th><a on:click={() => sortNumeric('id')} href="/support">id</a></th>
							<th>email</th>
							<th>name</th>
							<th>message</th>
						</tr>
					</thead>
					<tbody id="ticketRows">
						<!-- Product Rows to be inserted here -->
						{#each filtered as ticket}
							<tr>
								<td>{ticket.id}</td>
								<td>{ticket.email}</td>
								<td>{ticket.name}</td>
								<td>{ticket.message}</td>
								<td
									><button
										on:click={() => deleteSupportTicket(ticket.id)}
										class="btn btn-sm btn-outline-danger"
									>
										<span class="bi bi-trash" /></button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<!-- Add ticket button goes here -->
			<a id="AddTicketButton" class="btn btn-primary" href="/addsupport" role="button">New Ticket</a>
		</div>
		<!-- End Product col -->
	</div>
	<!-- End Row -->
</div>

<!-- End Main Content-->
<style>
</style>
