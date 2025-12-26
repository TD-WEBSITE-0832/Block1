const followBtn = document.getElementById('followBtn');
const followCount = document.getElementById('followCount');

followBtn.addEventListener('click', () => {
    let count = Number(followCount.textContent);
    count += 1;
    followCount.textContent = count; 
});
