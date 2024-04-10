// Get form and input elements
const addItemForm = document.getElementById('addItemForm');
const itemInput = document.getElementById('itemInput');
const categorySelect = document.getElementById('categorySelect');
const listItems = document.getElementById('listItems');

// Load items from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    loadItems();
});

// Event listener for form submission
addItemForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior
    // Call the add function
    add();
});

// Function to add list item
function add() {
    console.log("Running add function");

    // Validate inputs
    if (isValidated()) {
        // Create list item
        const newItem = document.createElement('li');
        newItem.classList.add('py-2', 'border-b', 'flex', 'items-center');

        // Emoji span
        const emojiSpan = document.createElement('span');
        emojiSpan.classList.add('text-2xl');
        emojiSpan.textContent = '➡️';
        newItem.appendChild(emojiSpan);

        // Text span
        const textSpan = document.createElement('span');
        textSpan.textContent = itemInput.value.trim();
        textSpan.classList.add('px-1', 'text-item'); // Add class 'text-item' for editing
        newItem.appendChild(textSpan);

        // Category span
        const categorySpan = document.createElement('span');
        categorySpan.classList.add('px-2', 'py-1', 'rounded-full');
        categorySpan.textContent = categorySelect.value;

        // Set background color based on category
        switch (categorySelect.value) {
            case 'fruit':
                categorySpan.classList.add('bg-pink-300', 'border-b');
                break;
            case 'dairy':
                categorySpan.classList.add('bg-green-300');
                break;
            case 'grain':
                categorySpan.classList.add('bg-yellow-300');
                break;
            default:
                categorySpan.classList.add('bg-gray-300');
                break;
        }
        newItem.appendChild(categorySpan);

        const actionsSpan = document.createElement('span');
        actionsSpan.classList.add('flex', 'ml-auto');

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = '✒';
        editBtn.classList.add('px-2', 'py-1', 'rounded-md', 'ml-2', 'edit-btn'); // Add class 'edit-btn' for event delegation
        editBtn.addEventListener('click', function () {
            editItem(newItem); // Call editItem function
        });
        actionsSpan.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.classList.add('px-2', 'py-1', 'rounded-md', 'ml-2');
        deleteBtn.addEventListener('click', function () {
            newItem.remove();
            removeItemFromLocalStorage(itemInput.value.trim());
        });
        actionsSpan.appendChild(deleteBtn);

        newItem.appendChild(actionsSpan);

        // Append new item to list
        listItems.appendChild(newItem);

        // Save item to local storage
        saveItemToLocalStorage(itemInput.value.trim(), categorySelect.value);

        // Clear input fields
        itemInput.value = '';
        categorySelect.value = '';

    } else {
        console.log("Invalid inputs");
    }
}

// Function to validate inputs
function isValidated() {
    console.log("Running isValidated function");

    var isValid = false;
    // Check if item input is empty
    if (itemInput.value.trim() === '') {
        itemInput.classList.add('border-red-500');
        return false;
    } else {
        itemInput.classList.remove('border-red-500');
    }

    // Check if category is selected
    if (categorySelect.value === '') {
        categorySelect.classList.add('border-red-500');
        return false;
    } else {
        categorySelect.classList.remove('border-red-500');
    }

    if (itemInput.value.trim() !== '' && categorySelect.value !== '') {
        isValid = true;
    }

    return true;
}

// Function to save item to local storage
function saveItemToLocalStorage(item, category) {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.push({ item: item, category: category });
    localStorage.setItem('items', JSON.stringify(items));
}

// Function to remove item from local storage
function removeItemFromLocalStorage(itemText) {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function (item, index) {
        if (item.item.trim() === itemText) {
            items.splice(index, 1);
        }
    });

    localStorage.setItem('items', JSON.stringify(items));
}

// Function to load items from local storage
function loadItems() {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(function (item) {
        const newItem = document.createElement('li');
        newItem.classList.add('py-2', 'border-b', 'flex', 'items-center');

        const emojiSpan = document.createElement('span');
        emojiSpan.classList.add('text-2xl');
        emojiSpan.textContent = '➡️';
        newItem.appendChild(emojiSpan);

        const textSpan = document.createElement('span');
        textSpan.textContent = item.item;
        textSpan.classList.add('px-1', 'text-item'); // Add class 'text-item' for editing
        newItem.appendChild(textSpan);

        const categorySpan = document.createElement('span');
        categorySpan.classList.add('px-2', 'py-1', 'rounded-full');
        categorySpan.textContent = item.category;

        switch (item.category) {
            case 'fruit':
                categorySpan.classList.add('bg-pink-300', 'border-b');
                break;
            case 'dairy':
                categorySpan.classList.add('bg-green-300');
                break;
            case 'grain':
                categorySpan.classList.add('bg-yellow-300');
                break;
            default:
                categorySpan.classList.add('bg-gray-300');
                break;
        }
        newItem.appendChild(categorySpan);

        const actionsSpan = document.createElement('span');
        actionsSpan.classList.add('flex', 'ml-auto');

        const editBtn = document.createElement('button');
        editBtn.textContent = '✒';
        editBtn.classList.add('px-2', 'py-1', 'rounded-md', 'ml-2', 'edit-btn'); // Add class 'edit-btn' for event delegation
        editBtn.addEventListener('click', function () {
            editItem(newItem); // Call editItem function
        });
        actionsSpan.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑';
        deleteBtn.classList.add('px-2', 'py-1', 'rounded-md', 'ml-2');
        deleteBtn.addEventListener('click', function () {
            newItem.remove();
            removeItemFromLocalStorage(item.item);
        });
        actionsSpan.appendChild(deleteBtn);

        newItem.appendChild(actionsSpan);

        listItems.appendChild(newItem);
    });
}

// Function to handle editing an item
function editItem(itemElement) {
    const textElement = itemElement.querySelector('.text-item');
    const newText = prompt('Edit item:', textElement.textContent.trim());
    if (newText !== null) {
        textElement.textContent = newText;
        updateItemInLocalStorage(itemElement, newText);
    }
}

// Event delegation for edit button clicks
listItems.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-btn')) {
        const listItem = event.target.closest('li');
        editItem(listItem);
    }
});

// Function to update item in local storage after editing
function updateItemInLocalStorage(itemElement, newText) {
    const items = JSON.parse(localStorage.getItem('items'));
    const itemIndex = Array.from(listItems.children).indexOf(itemElement);
    items[itemIndex].item = newText;
    localStorage.setItem('items', JSON.stringify(items));
}

