// Header / search small helper
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('focus', () => searchInput.placeholder = '');
    searchInput.addEventListener('blur', () => { if (!searchInput.value) searchInput.placeholder = 'Mahsulotlarni qidirish'; });

    // Simple static suggestions
    const suggestions = ['Nescafe','Banana','Sut','Pepsi','Kit Kat'];
    const suggestBox = document.createElement('div');
    suggestBox.className = 'search-suggestions';
    suggestBox.style.position = 'absolute';
    suggestBox.style.background = '#fff';
    suggestBox.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
    suggestBox.style.borderRadius = '6px';
    suggestBox.style.padding = '6px';
    suggestBox.style.display = 'none';
    suggestBox.style.zIndex = 1000;
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(suggestBox);

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) { suggestBox.style.display = 'none'; return; }
        suggestBox.innerHTML = '';
        suggestions.filter(s => s.toLowerCase().includes(q)).slice(0,5).forEach(s => {
            const el = document.createElement('div');
            el.textContent = s;
            el.style.padding = '6px 8px';
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => { searchInput.value = s; suggestBox.style.display = 'none'; });
            suggestBox.appendChild(el);
        });
        suggestBox.style.display = suggestBox.children.length ? 'block' : 'none';
    });
}

// Cart counters (updates badge across pages)
function updateCartBadge() {
    const badge = document.querySelector('.badge');
    const qty = parseInt(localStorage.getItem('cartQty') || '0', 10);
    if (badge) badge.textContent = qty;
}

function changeCart(delta = 1) {
    const qty = Math.max(0, parseInt(localStorage.getItem('cartQty') || '0', 10) + delta);
    localStorage.setItem('cartQty', qty);
    updateCartBadge();
}

// Wire +/- buttons on product pages
document.querySelectorAll('.bt4.pl, .bt4.pls, .bt4.plus1, .bt4.plus2').forEach(btn => {
    btn.addEventListener('click', () => changeCart(1));
});
document.querySelectorAll('.bt4.min, .bt4.mins, .bt4.minus1, .bt4.minus2').forEach(btn => {
    btn.addEventListener('click', () => changeCart(-1));
});

// Buy / add-to-cart buttons should increment cart
document.querySelectorAll('form[action="shop.html"] button, form[action^="buy"] button, .bt3, .bt1').forEach(b => {
    b.addEventListener('click', (e) => {
        // if inside a real form we allow submission, otherwise just update cart
        changeCart(1);
    });
});

updateCartBadge();

// Map markers: click shows popup and centers (works with our static overlay markers)
document.addEventListener('click', (e) => {
    const marker = e.target.closest('.marker');
    if (!marker) return;
    // hide all popups
    document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.style.display = 'block';
        // position popup near red marker if clicked marker is red
        if (marker.classList.contains('red')) {
            popup.style.top = '36%';
            popup.style.left = '52%';
        } else {
            // place popup just above clicked marker
            const top = marker.style.top || '40%';
            const left = marker.style.left || '50%';
            popup.style.top = top;
            popup.style.left = left;
        }
    }
});

// Simple form validation for checkout-ish pages (prevent empty required fields)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const required = form.querySelectorAll('[required]');
        for (const el of required) {
            if (!el.value) {
                e.preventDefault();
                el.focus();
                alert('Iltimos, barcha majburiy maydonlarni to‘ldiring');
                return;
            }
        }
    });
});

console.log('UI helpers loaded');


