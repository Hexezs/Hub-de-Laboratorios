// --- DATA CONFIGURATION ---
const rootData = [
    {
        type: 'folder',
        label: 'Unidad I',
        items: [
            // { type: 'link', label: 'Componentes Rectangulares', url: '#',target: '_blank' },
            { type: 'link', label: 'Mesa de Fuerzas', url: 'https://hexezs.github.io/mesa-de-fuerzas/',target: '_blank' }
        ]
    },
    {
        type: 'folder',
        label: 'Unidad II',
        items: [
            { type: 'link', label: 'Laboratorio Ley de Newton', url: 'https://hexezs.github.io/Segunda-Ley-de-Newton/',target: '_blank' },
            { type: 'link', label: 'Rectilineo Uniforme y No', url: 'https://hexezs.github.io/simulador-de-MRU/',target: '_blank' }
        ]
    },
    {
        type: 'folder',
        label: 'Unidad III',
        items: [
            // { type: 'link', label: 'Lentes', url: '#',target: '_blank' },
            { type: 'link', label: 'Óptica 1', url: 'https://hexezs.github.io/Simulador-de-ptica-Geometrica/',target: '_blank' },
            // { type: 'link', label: 'Óptica 1.1', url: '#',target: '_blank'}
        ]
    },
    {
        type: 'link',
        label: 'Termodinamica',
        url: 'https://hexezs.github.io/Laboratorio-de-Termodin-mica/',
        target: '_blank'
    },
    {
        type: 'link',
        label: 'Transferencia de Calor',
        url: 'https://hexezs.github.io/TRANSFERENCIA-DE-CALOR/',
        target: '_blank'
    }
];

// --- APP STATE ---
let currentLevel = rootData;
const historyStack = [];

const container = document.getElementById('grid-container');

// --- RENDER FUNCTION ---
function renderGrid(items) {
    container.innerHTML = ''; // Clear current view

    // 1. Add Back Button if we are deep in folders
    if (historyStack.length > 0) {
        const backBtn = document.createElement('div');
        backBtn.className = 'glass-button back-button';
        backBtn.innerHTML = '<span class="label">⬅ Atrás</span>';
        backBtn.onclick = goBack;
        container.appendChild(backBtn);
    }

    // 2. Render Items
    items.forEach(item => {
        if (item.type === 'link') {
            const a = document.createElement('a');
            a.className = 'glass-button';
            a.href = item.url;
            if (item.target) a.target = item.target;

            a.innerHTML = `<span class="label">${item.label}</span>`;
            container.appendChild(a);
        }
        else if (item.type === 'folder') {
            const div = document.createElement('div');
            div.className = 'glass-button folder';
            // Optional: Folder visual indicator (optional icon or just text)
            div.innerHTML = `<span class="label">📂 ${item.label}</span>`;

            div.onclick = () => openFolder(item.items);
            container.appendChild(div);
        }
    });

    // 3. Trigger simple entrance animation (optional CSS class)
    // container.classList.add('fade-in'); 
}

// --- NAVIGATION LOGIC ---
function openFolder(nextItems) {
    historyStack.push(currentLevel);
    currentLevel = nextItems;
    renderGrid(currentLevel);
}

function goBack() {
    if (historyStack.length === 0) return;
    currentLevel = historyStack.pop();
    renderGrid(currentLevel);
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderGrid(rootData);
});
