// Import sveltekit dependencies
import { invalid, redirect } from "@sveltejs/kit"

// Import the addNewProduct() function from the product store.
import { addNewSupportTicket } from '../../stores/supportStore.js';


export const actions = {
    addsupport: async ({request }) => {
      let success = false;

      // get data from the POST request
      const form_data = await request.formData();

      // read each value - to do: add validation
      const support = {
        supportArea_id: Number(form_data.get('supportArea_id')),
        name: form_data.get('name'),
        message: form_data.get('message'),
        email: form_data.get('email')
      }

      // Basic validation
      if (support.supportArea_id > 0 &&
          support.name != '' &&
          support.message != '' &&
          support.email != ''
      ) {
          // Add the new product via the API (using the product store function)
          const result = await addNewSupportTicket(JSON.stringify(support));
          console.log('add support ticket result: ', result)

        // return the result
        // This will display the success section of the page to show the newly added product
        return { 
          success: true,
          message: `New ticket added with id: ${result.support.id}`,
          support: result.support
        };

        // This will cause the form to redisplay for corrections, along with an error message
      } else {
        return invalid(400, {
          error: true,
          message: 'validation failed',
          support: support
        })
      }
    }

  };