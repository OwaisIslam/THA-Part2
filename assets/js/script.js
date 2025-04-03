 localStorage.clear();

var apiURL = "https://api.postscript.io/api/v2/subscribers";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer sk_6cd914fbb2c682a0626e85de06faed40'
    }
};

fetch(apiURL, options)
    .then(res => res.json())
    .then(function(res) {
        var numberOfSubs = res.subscribers.length;

        const tableBody = document.querySelector('tbody');

        console.log("Num of Subscribers: "+ numberOfSubs);

        for (var i = 0; i < numberOfSubs; i++) {
            console.log("Phone Number " + (i + 1) + ": " + res.subscribers[i].phone_number);
            console.log("Email " + (i + 1) + ": " + res.subscribers[i].email);
            console.log("Created Date " + (i + 1) + ": " + res.subscribers[i].created_at);
            console.log("Tags " + (i + 1) + ": " + res.subscribers[i].tags);

            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${res.subscribers[i].phone_number}</th>
                <td>${res.subscribers[i].email}</td>
                <td>${moment(res.subscribers[i].created_at).format('MM/DD/YYYY')}</td>
                <td>${res.subscribers[i].tags.join(', ')}</td>
                <td><button class="btn btn-primary">Add Tag</button></td>
            `;
            tableBody.appendChild(row);
        }
    })
    .catch(err => console.error(err)); {
        console.log("Error fetching data");
    }

    document.addEventListener('DOMContentLoaded', function () {
        const content = document.querySelector('.content'); 
        const itemsPerPage = 5;
        let currentPage = 0;
        const items = Array.from(content.getElementsByTagName('tr')).slice(1);
      
      function showPage(page) {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        items.forEach((item, index) => {
          item.classList.toggle('hidden', index < startIndex || index >= endIndex);
        });
        updateActiveButtonStates();
      }
      
      function createPageButtons() {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        const paginationContainer = document.createElement('div');
        const paginationDiv = document.body.appendChild(paginationContainer);
        paginationContainer.classList.add('pagination');
      
        // Add page buttons
        for (let i = 0; i < totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.textContent = i + 1;
          pageButton.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);
            updateActiveButtonStates();
          });
      
            content.appendChild(paginationContainer);
            paginationDiv.appendChild(pageButton);
          }
      }
      
      function updateActiveButtonStates() {
        const pageButtons = document.querySelectorAll('.pagination button');
        pageButtons.forEach((button, index) => {
          if (index === currentPage) {
            button.classList.add('active');
          } else {
            button.classList.remove('active');
          }
        });
      }
      
        createPageButtons(); // Call this function to create the page buttons initially
        showPage(currentPage);
      });