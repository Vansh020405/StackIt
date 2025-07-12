// Mock data structure
let questions = [];
let currentUser = null;

// DOM Elements
const notificationsButton = document.getElementById('notifications');
const userMenuButton = document.getElementById('user-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-mobile-menu');

// Rich Text Editor Configuration
ClassicEditor
    .create(document.querySelector('#editor'), {
        toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'undo',
            'redo',
            'alignment',
            'imageUpload',
            'insertTable'
        ]
    })
    .catch(error => {
        console.error(error);
    });

// Mobile Menu Functions
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Authentication Functions
function login(username, password) {
    // Mock authentication
    if (username === 'admin' && password === 'admin123') {
        currentUser = { username: 'admin', role: 'admin' };
        updateUI();
        return true;
    }
    return false;
}

function logout() {
    currentUser = null;
    updateUI();
}

// Question Functions
function addQuestion(title, description, tags) {
    const newQuestion = {
        id: Date.now(),
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        createdAt: new Date(),
        answers: [],
        votes: 0,
        author: currentUser?.username || 'Anonymous'
    };
    questions.push(newQuestion);
    updateQuestionsList();
}

function addAnswer(questionId, content) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        question.answers.push({
            id: Date.now(),
            content,
            createdAt: new Date(),
            votes: 0,
            author: currentUser?.username || 'Anonymous'
        });
        updateQuestionsList();
    }
}

// UI Functions
function updateUI() {
    // Update navigation based on user role
    const nav = document.querySelector('nav');
    if (currentUser) {
        nav.innerHTML += `
            <div class="ml-3 relative">
                <button id="user-menu" class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="https://via.placeholder.com/32" alt="">
                </button>
            </div>
        `;
    }
}

function updateQuestionsList() {
    const questionsContainer = document.querySelector('.space-y-4');
    questionsContainer.innerHTML = questions.map(q => `
        <div class="bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition-colors">
            <div class="p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-lg font-semibold text-white">${q.title}</span>
                        <div class="ml-4">
                            ${q.tags.map(tag => `
                                <span class="tag-badge">${tag}</span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button class="text-gray-400 hover:text-white">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5v14h14V5m0 0L12 11L5 5h14z"></path>
                            </svg>
                        </button>
                        <span class="text-sm text-gray-400">${q.answers.length} answers</span>
                    </div>
                </div>
                <div class="mt-2 text-gray-400">
                    ${q.description}
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button onclick="voteQuestion(${q.id}, 'up')" class="vote-button flex items-center space-x-1 text-gray-400 hover:text-white">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                            </svg>
                            <span>Upvote</span>
                        </button>
                        <button onclick="voteQuestion(${q.id}, 'down')" class="vote-button flex items-center space-x-1 text-gray-400 hover:text-white">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                            <span>Downvote</span>
                        </button>
                    </div>
                    <div class="flex items-center space-x-2 text-sm text-gray-400">
                        <span>Asked by ${q.author}</span>
                        <span>•</span>
                        <span>${new Date(q.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Voting Functions
function voteQuestion(questionId, direction) {
    if (!currentUser) {
        alert('Please login to vote');
        return;
    }
    const question = questions.find(q => q.id === questionId);
    if (question) {
        question.votes += direction === 'up' ? 1 : -1;
        updateQuestionsList();
    }
}

// Event Listeners
notificationsButton.addEventListener('click', () => {
    // Mock notification system
    alert('Notifications feature coming soon!');
});

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
closeMobileMenu.addEventListener('click', toggleMobileMenu);

// Initialize
updateUI();

// Mock data
questions.push({
    id: 1,
    title: 'How to implement dark mode in React?',
    description: 'I want to create a dark mode toggle in my React application. What is the best way to implement this?',
    tags: ['react', 'dark-mode', 'css'],
    createdAt: new Date(),
    answers: [],
    votes: 5,
    author: 'John Doe'
});

questions.push({
    id: 2,
    title: 'Best practices for state management in React?',
    description: 'I want to know the best practices for managing state in React applications. What are the pros and cons of different approaches?',
    tags: ['react', 'state-management', 'redux', 'context-api'],
    createdAt: new Date(),
    answers: [],
    votes: 3,
    author: 'Jane Smith'
});

questions.push({
    id: 3,
    title: 'How to optimize React component performance?',
    description: 'I have a large React application and I want to optimize its performance. What are the best practices for optimizing React components?',
    tags: ['react', 'performance', 'optimization'],
    createdAt: new Date(),
    answers: [],
    votes: 2,
    author: 'Mike Johnson'
});

questions.push({
    id: 4,
    title: 'Implementing authentication in React?',
    description: 'I want to add authentication to my React application. What is the best way to implement login and registration?',
    tags: ['react', 'authentication', 'jwt', 'firebase'],
    createdAt: new Date(),
    answers: [],
    votes: 4,
    author: 'Sarah Wilson'
});

updateQuestionsList();
