function toggleContent(id) {
    const element = document.getElementById(id);
    element.classList.toggle('hidden');
    gsap.fromTo(`#${id}`, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    if (element.querySelector('.feedback')) {
        gsap.to(`#${id} .feedback`, { opacity: 1, duration: 0.5, delay: 0.5, onComplete: () => element.querySelector('.feedback').classList.add('show') });
    }
    updateProgress();
}
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
});
function updateProgress() {
    const modules = document.querySelectorAll('.module');
    const completed = Array.from(modules).filter(m => !m.querySelector('.hidden')).length;
    const progress = (completed / modules.length) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}
let triangleAnim = null;
function playTriangleAnimation() {
    const canvas = document.getElementById('triangle-concept');
    const ctx = canvas.getContext('2d');
    let progress = 0;
    function drawTriangle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(50, 150);
        if (progress > 0.33) ctx.lineTo(150, 150);
        if (progress > 0.66) ctx.lineTo(100, 50);
        ctx.closePath();
        ctx.strokeStyle = '#2e7d32';
        ctx.stroke();
        ctx.font = '16px Noto Sans SC';
        ctx.fillText('A', 45, 160);
        ctx.fillText('B', 155, 160);
        ctx.fillText('C', 100, 40);
    }
    triangleAnim = gsap.to({ progress: 0 }, {
        progress: 1,
        duration: 3,
        onUpdate: () => {
            progress = this.progress();
            drawTriangle();
        },
        paused: true
    });
    triangleAnim.play();
}
function pauseTriangleAnimation() {
    if (triangleAnim) triangleAnim.pause();
}
let angleSumAnim = null;
function playAngleSumAnimation() {
    const canvas = document.getElementById('angle-sum-animation');
    const ctx = canvas.getContext('2d');
    let progress = 0;
    function drawAngleSum() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(50, 150);
        ctx.lineTo(150, 150);
        ctx.lineTo(100, 50);
        ctx.closePath();
        ctx.strokeStyle = '#2e7d32';
        ctx.stroke();
        if (progress > 0.2) {
            ctx.beginPath();
            ctx.moveTo(30, 50);
            ctx.lineTo(170 * progress, 50);
            ctx.strokeStyle = '#0288d1';
            ctx.stroke();
        }
        if (progress > 0.4) {
            ctx.fillStyle = '#2e7d32';
            ctx.font = '14px Noto Sans SC';
            ctx.fillText('∠1', 100, 40);
            ctx.fillText('∠2', 45, 140);
            ctx.fillText('∠3', 155, 140);
        }
        if (progress > 0.6) {
            ctx.fillStyle = '#0288d1';
            ctx.fillText('∠4=∠2', 60, 60);
            ctx.fillText('∠5=∠3', 140, 60);
        }
        if (progress > 0.8) {
            ctx.fillStyle = '#d81b60';
            ctx.fillText('180°', 100, 70);
        }
    }
    angleSumAnim = gsap.to({ progress: 0 }, {
        progress: 1,
        duration: 5,
        onUpdate: () => {
            progress = this.progress();
            drawAngleSum();
        },
        paused: true
    });
    angleSumAnim.play();
}
function pauseAngleSumAnimation() {
    if (angleSumAnim) angleSumAnim.pause();
}
document.querySelectorAll('.highlightable').forEach(line => {
    line.addEventListener('click', () => {
        line.classList.add('active');
        setTimeout(() => line.classList.remove('active'), 1000);
    });
    line.addEventListener('touchstart', () => {
        line.classList.add('active');
        setTimeout(() => line.classList.remove('active'), 1000);
    });
});