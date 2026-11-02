// ==========================================
// ملف إدارة وعرض الأخبار والفيديوهات (news.js)
// مدرسة عمرو موسى الثانوية بنين
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    loadSavedMedia();
});

function openUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) modal.classList.add('modal-active');
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) modal.classList.remove('modal-active');
}

// معالجة الرابط المضاف (سواء تيك توك، فيديو مباشر، أو صورة)
function handleLinkAdd(e) {
    e.preventDefault();
    const title = document.getElementById('mediaTitle').value;
    const mediaUrl = document.getElementById('mediaUrlInput').value;

    // تحديد نوع المحتوى بناءً على الرابط
    const isTikTok = mediaUrl.includes('tiktok.com');
    const isVideo = mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') || mediaUrl.endsWith('.mov') || mediaUrl.includes('video');

    const mediaItem = { title, url: mediaUrl, isTikTok, isVideo };
    
    saveMediaToStorage(mediaItem);
    renderMediaCard(mediaItem);

    closeUploadModal();
    document.getElementById('uploadForm').reset();
    alert('تم تفعيل وعرض الفيديو بنجاح على موقع المدرسة! 🎉');
}

function saveMediaToStorage(item) {
    let items = JSON.parse(localStorage.getItem('school_media_links') || '[]');
    items.unshift(item);
    localStorage.setItem('school_media_links', JSON.stringify(items));
}

function loadSavedMedia() {
    let items = JSON.parse(localStorage.getItem('school_media_links') || '[]');
    items.forEach(item => renderMediaCard(item));
}

function renderMediaCard(item) {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    
    const newCard = document.createElement('div');
    newCard.className = 'news-card bg-white rounded-2xl overflow-hidden card-glow transition duration-300 flex flex-col justify-between';

    let mediaHTML = '';
    let badgeText = '';

    if (item.isTikTok) {
        badgeText = 'فيديو تيك توك';
        mediaHTML = `
            <div class="w-full h-52 bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white rounded-t-2xl relative">
                <i class="fa-brands.fa-tiktok text-4xl mb-3 text-brand-red animate-bounce"></i>
                <p class="text-xs font-bold mb-4 text-slate-300">عرض فيديو "معني الهوى" على تيك توك</p>
                <a href="${item.url}" target="_blank" class="bg-brand-red hover:bg-brand-darkred text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-lg transition">
                    <i class="fa-solid fa-play ml-1"></i> مشاهدة الفيديو مباشرة
                </a>
            </div>
        `;
    } else if (item.isVideo) {
        badgeText = 'فيديو مباشر';
        mediaHTML = `<video src="${item.url}" controls preload="metadata" class="w-full h-52 object-cover bg-black rounded-t-2xl"></video>`;
    } else {
        badgeText = 'صورة تخصصية';
        mediaHTML = `<img src="${item.url}" alt="${item.title}" class="w-full h-52 object-cover">`;
    }

    newCard.innerHTML = `
        <div>
            <div class="relative">
                ${mediaHTML}
                <span class="absolute top-3 right-3 bg-brand-red text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">${badgeText}</span>
            </div>
            <div class="p-6">
                <div class="text-slate-400 text-xs font-semibold mb-2 flex items-center gap-2">
                    <i class="fa-regular fa-circle-play text-brand-red"></i> تغطية جديدة
                </div>
                <h3 class="text-lg font-bold text-brand-navy mb-3 hover:text-brand-blue transition">${item.title}</h3>
                <p class="text-slate-600 text-xs leading-relaxed font-semibold">مادة مرئية تم إضافتها وتفعيلها للعرض على بوابة مدرسة عمرو موسى الثانوية بنين.</p>
            </div>
        </div>
    `;
    grid.prepend(newCard);
}
