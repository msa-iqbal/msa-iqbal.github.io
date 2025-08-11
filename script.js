// Import PDF.js library
const pdfjsLib = window['pdfjs-dist/build/pdf'];

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Database Manager with File System
class DatabaseManager {
    constructor() {
        this.data = null;
        this.fileStorage = new Map(); // Store file data
        this.dbKey = 'pdfhub_database';
        this.filesKey = 'pdfhub_files';
    }

    async loadDatabase() {
        try {
            // Try to load from localStorage first
            const savedData = localStorage.getItem(this.dbKey);
            const savedFiles = localStorage.getItem(this.filesKey);
            
            if (savedData) {
                this.data = JSON.parse(savedData);
                if (savedFiles) {
                    const filesArray = JSON.parse(savedFiles);
                    filesArray.forEach(([key, value]) => {
                        this.fileStorage.set(key, value);
                    });
                }
                return this.data;
            }
            
            // Fallback to default data
            return this.loadDefaultData();
        } catch (error) {
            console.error('Database loading error:', error);
            return this.loadDefaultData();
        }
    }

    loadDefaultData() {
        this.data = {
            documents: [
                {
                    id: 1,
                    name: "JavaScript Complete Guide.pdf",
                    author: "John Smith",
                    category: "technical",
                    size: "2.4 MB",
                    sizeBytes: 2516582,
                    date: "2024-01-15",
                    downloads: 1247,
                    description: "Comprehensive guide to modern JavaScript development",
                    uploadedBy: "admin",
                    tags: ["javascript", "programming", "web development"]
                },
                {
                    id: 2,
                    name: "Business Strategy Framework.pdf",
                    author: "Sarah Johnson",
                    category: "business",
                    size: "1.8 MB",
                    sizeBytes: 1887437,
                    date: "2024-01-12",
                    downloads: 892,
                    description: "Strategic planning and business development frameworks",
                    uploadedBy: "sarah_j",
                    tags: ["business", "strategy", "planning"]
                }
            ],
            categories: [
                { id: "all", name: "All Documents", icon: "fas fa-folder" },
                { id: "academic", name: "Academic", icon: "fas fa-graduation-cap" },
                { id: "business", name: "Business", icon: "fas fa-briefcase" },
                { id: "technical", name: "Technical", icon: "fas fa-code" },
                { id: "research", name: "Research", icon: "fas fa-flask" },
                { id: "legal", name: "Legal", icon: "fas fa-gavel" },
                { id: "manual", name: "Manuals", icon: "fas fa-book" },
                { id: "other", name: "Other", icon: "fas fa-file-alt" }
            ],
            settings: {
                maxFileSize: 52428800,
                allowedFileTypes: [".pdf"],
                uploadsEnabled: true,
                previewEnabled: true,
                downloadEnabled: true
            }
        };
        
        this.saveToStorage();
        return this.data;
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.dbKey, JSON.stringify(this.data));
            const filesArray = Array.from(this.fileStorage.entries());
            localStorage.setItem(this.filesKey, JSON.stringify(filesArray));
        } catch (error) {
            console.error('Failed to save to storage:', error);
        }
    }

    addDocument(document, fileData = null) {
        if (!this.data) return false;
        
        document.id = Date.now();
        document.date = new Date().toISOString().split('T')[0];
        document.downloads = 0;
        document.uploadedBy = 'user';
        
        this.data.documents.unshift(document);
        
        if (fileData) {
            this.fileStorage.set(document.id.toString(), fileData);
        }
        
        this.saveToStorage();
        return true;
    }

    updateDocument(id, updates) {
        if (!this.data) return false;
        
        const docIndex = this.data.documents.findIndex(doc => doc.id === id);
        if (docIndex !== -1) {
            this.data.documents[docIndex] = { ...this.data.documents[docIndex], ...updates };
            this.saveToStorage();
            return true;
        }
        return false;
    }

    deleteDocument(id) {
        if (!this.data) return false;
        
        const docIndex = this.data.documents.findIndex(doc => doc.id === id);
        if (docIndex !== -1) {
            this.data.documents.splice(docIndex, 1);
            this.fileStorage.delete(id.toString());
            this.saveToStorage();
            return true;
        }
        return false;
    }

    getDocument(id) {
        if (!this.data) return null;
        return this.data.documents.find(doc => doc.id === id);
    }

    getFileData(id) {
        return this.fileStorage.get(id.toString());
    }

    getDocuments() {
        return this.data ? this.data.documents : [];
    }

    getCategories() {
        return this.data ? this.data.categories : [];
    }
}

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.applyTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.theme);
    }

    applyTheme() {
        document.body.setAttribute('data-theme', this.theme);
        const icon = this.themeToggle.querySelector('i');
        icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Notification System
class NotificationManager {
    constructor() {
        this.container = document.getElementById('notificationContainer');
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = this.getIcon(type);
        notification.innerHTML = `
            <i class="${icon}"></i>
            <div class="notification-text">${message}</div>
        `;

        this.container.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    this.container.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }
}

// PDF Preview Manager
class PreviewManager {
    constructor() {
        this.previewModal = document.getElementById('previewModal');
        this.previewTitle = document.getElementById('previewTitle');
        this.previewInfo = document.getElementById('previewInfo');
        this.previewClose = document.getElementById('previewClose');
        this.downloadFromPreview = document.getElementById('downloadFromPreview');
        this.shareFromPreview = document.getElementById('shareFromPreview');
        this.canvas = document.getElementById('pdfCanvas');
        this.prevPageBtn = document.getElementById('prevPage');
        this.nextPageBtn = document.getElementById('nextPage');
        this.pageInfo = document.getElementById('pageInfo');
        
        this.currentDocument = null;
        this.pdfDoc = null;
        this.currentPage = 1;
        this.scale = 1.5;
        
        this.init();
    }

    init() {
        this.previewClose.addEventListener('click', () => this.hidePreview());
        this.downloadFromPreview.addEventListener('click', () => this.downloadFromPreview());
        this.shareFromPreview.addEventListener('click', () => this.shareFromPreview());
        this.prevPageBtn.addEventListener('click', () => this.prevPage());
        this.nextPageBtn.addEventListener('click', () => this.nextPage());
        
        this.previewModal.addEventListener('click', (e) => {
            if (e.target === this.previewModal) {
                this.hidePreview();
            }
        });
    }

    async showPreview(document) {
        this.currentDocument = document;
        this.previewTitle.textContent = document.name;
        
        // Show modal first
        this.previewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Populate document info
        this.previewInfo.innerHTML = `
            <div class="preview-meta">
                <div class="meta-item">
                    <strong>Author:</strong> ${document.author}
                </div>
                <div class="meta-item">
                    <strong>Category:</strong> ${document.category}
                </div>
                <div class="meta-item">
                    <strong>Size:</strong> ${document.size}
                </div>
                <div class="meta-item">
                    <strong>Date:</strong> ${new Date(document.date).toLocaleDateString()}
                </div>
                <div class="meta-item">
                    <strong>Downloads:</strong> ${document.downloads}
                </div>
                <div class="meta-item">
                    <strong>Description:</strong> ${document.description}
                </div>
            </div>
        `;
        
        // Try to load PDF
        await this.loadPDF(document);
    }

    async loadPDF(document) {
        try {
            const fileData = window.databaseManager.getFileData(document.id);
            
            if (fileData) {
                // Load actual PDF file
                const loadingTask = pdfjsLib.getDocument({ data: fileData });
                this.pdfDoc = await loadingTask.promise;
                this.currentPage = 1;
                await this.renderPage();
                this.updatePageControls();
            } else {
                // Show placeholder for documents without file data
                this.showPlaceholder();
            }
        } catch (error) {
            console.error('Error loading PDF:', error);
            this.showPlaceholder();
        }
    }

    async renderPage() {
        if (!this.pdfDoc) return;
        
        try {
            const page = await this.pdfDoc.getPage(this.currentPage);
            const viewport = page.getViewport({ scale: this.scale });
            
            this.canvas.width = viewport.width;
            this.canvas.height = viewport.height;
            
            const context = this.canvas.getContext('2d');
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
        } catch (error) {
            console.error('Error rendering page:', error);
        }
    }

    showPlaceholder() {
        const context = this.canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 800;
        
        // Clear canvas
        context.fillStyle = '#f8fafc';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw border
        context.strokeStyle = '#e2e8f0';
        context.lineWidth = 2;
        context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw PDF icon and text
        context.fillStyle = '#64748b';
        context.font = '48px FontAwesome';
        context.textAlign = 'center';
        context.fillText('📄', this.canvas.width / 2, this.canvas.height / 2 - 50);
        
        context.fillStyle = '#475569';
        context.font = '24px Inter, sans-serif';
        context.fillText('PDF Preview', this.canvas.width / 2, this.canvas.height / 2 + 20);
        
        context.font = '16px Inter, sans-serif';
        context.fillText('Upload a PDF file to see preview', this.canvas.width / 2, this.canvas.height / 2 + 50);
        
        this.updatePageControls(false);
    }

    updatePageControls(hasPages = true) {
        if (hasPages && this.pdfDoc) {
            this.pageInfo.textContent = `Page ${this.currentPage} of ${this.pdfDoc.numPages}`;
            this.prevPageBtn.disabled = this.currentPage <= 1;
            this.nextPageBtn.disabled = this.currentPage >= this.pdfDoc.numPages;
        } else {
            this.pageInfo.textContent = 'No preview available';
            this.prevPageBtn.disabled = true;
            this.nextPageBtn.disabled = true;
        }
    }

    async prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            await this.renderPage();
            this.updatePageControls();
        }
    }

    async nextPage() {
        if (this.pdfDoc && this.currentPage < this.pdfDoc.numPages) {
            this.currentPage++;
            await this.renderPage();
            this.updatePageControls();
        }
    }

    hidePreview() {
        this.previewModal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentDocument = null;
        this.pdfDoc = null;
    }

    downloadFromPreview() {
        if (this.currentDocument) {
            this.hidePreview();
            window.documentManager.downloadDocument(this.currentDocument.id);
        }
    }

    shareFromPreview() {
        if (this.currentDocument) {
            window.documentManager.shareDocument(this.currentDocument.id);
        }
    }
}

// Document Manager
class DocumentManager {
    constructor() {
        this.documents = [];
        this.filteredDocuments = [];
        this.currentCategory = 'all';
        this.currentSort = 'name';
        this.searchQuery = '';
        this.selectedDocument = null;
    }

    async init() {
        const data = await window.databaseManager.loadDatabase();
        this.documents = data.documents || [];
        this.renderCategories(data.categories || []);
        this.updateCategoryCounts();
        this.applyFilters();
    }

    renderCategories(categories) {
        const categoryList = document.getElementById('categoryList');
        categoryList.innerHTML = categories.map(category => `
            <li class="category-item ${category.id === 'all' ? 'active' : ''}" data-category="${category.id}">
                <i class="${category.icon}"></i>
                <span>${category.name}</span>
                <span class="count" id="count${category.id.charAt(0).toUpperCase() + category.id.slice(1)}">0</span>
            </li>
        `).join('');
    }

    updateCategoryCounts() {
        const counts = {
            all: this.documents.length,
            academic: 0,
            business: 0,
            technical: 0,
            research: 0,
            legal: 0,
            manual: 0,
            other: 0
        };

        this.documents.forEach(doc => {
            if (counts.hasOwnProperty(doc.category)) {
                counts[doc.category]++;
            } else {
                counts.other++;
            }
        });

        Object.keys(counts).forEach(category => {
            const countElement = document.getElementById(`count${category.charAt(0).toUpperCase() + category.slice(1)}`);
            if (countElement) {
                countElement.textContent = counts[category];
            }
        });
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.applyFilters();
        this.updateBreadcrumb();
    }

    searchDocuments(query) {
        this.searchQuery = query.toLowerCase();
        this.applyFilters();
    }

    sortDocuments(sortBy) {
        this.currentSort = sortBy;
        this.applyFilters();
    }

    applyFilters() {
        this.filteredDocuments = this.documents.filter(doc => {
            const matchesCategory = this.currentCategory === 'all' || doc.category === this.currentCategory;
            const matchesSearch = !this.searchQuery || 
                doc.name.toLowerCase().includes(this.searchQuery) ||
                doc.author.toLowerCase().includes(this.searchQuery) ||
                doc.description.toLowerCase().includes(this.searchQuery);
            
            return matchesCategory && matchesSearch;
        });

        this.sortFilteredDocuments();
        this.renderDocuments();
        this.updateDocumentCount();
    }

    sortFilteredDocuments() {
        this.filteredDocuments.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                case 'size':
                    return this.parseSize(b.size) - this.parseSize(a.size);
                case 'downloads':
                    return b.downloads - a.downloads;
                default:
                    return 0;
            }
        });
    }

    parseSize(sizeStr) {
        const size = parseFloat(sizeStr);
        const unit = sizeStr.toLowerCase();
        if (unit.includes('gb')) return size * 1024;
        if (unit.includes('mb')) return size;
        if (unit.includes('kb')) return size / 1024;
        return size / (1024 * 1024);
    }

    renderDocuments() {
        const container = document.getElementById('documentList');
        const emptyState = document.getElementById('emptyState');
        
        if (this.filteredDocuments.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        container.style.display = 'block';
        emptyState.style.display = 'none';
        
        container.innerHTML = this.filteredDocuments.map(doc => this.createDocumentItem(doc)).join('');
        
        // Add event listeners
        container.querySelectorAll('.document-item').forEach(item => {
            const docId = parseInt(item.dataset.id);
            
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.action-btn')) {
                    this.selectDocument(docId);
                }
            });
            
            item.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, docId);
            });
        });
    }

    createDocumentItem(doc) {
        const formattedDate = new Date(doc.date).toLocaleDateString();
        
        return `
            <div class="document-item fade-in-up" data-id="${doc.id}">
                <div class="document-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="document-info">
                    <div class="document-name">${doc.name}</div>
                    <div class="document-meta">
                        <span>by ${doc.author}</span>
                        <span>${doc.size}</span>
                        <span>${formattedDate}</span>
                        <span>${doc.downloads} downloads</span>
                    </div>
                </div>
                <div class="document-actions">
                    <button class="action-btn" onclick="window.documentManager.downloadDocument(${doc.id})" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn" onclick="window.documentManager.previewDocument(${doc.id})" title="Preview">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="window.documentManager.shareDocument(${doc.id})" title="Share">
                        <i class="fas fa-share"></i>
                    </button>
                    <button class="action-btn danger" onclick="window.documentManager.deleteDocument(${doc.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    selectDocument(docId) {
        document.querySelectorAll('.document-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        const item = document.querySelector(`[data-id="${docId}"]`);
        if (item) {
            item.classList.add('selected');
            this.selectedDocument = this.documents.find(doc => doc.id === docId);
        }
    }

    updateDocumentCount() {
        const countElement = document.getElementById('documentCount');
        const count = this.filteredDocuments.length;
        countElement.textContent = `${count} document${count !== 1 ? 's' : ''}`;
    }

    updateBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        const categoryNames = {
            all: 'All Documents',
            academic: 'Academic',
            business: 'Business',
            technical: 'Technical',
            research: 'Research',
            legal: 'Legal',
            manual: 'Manuals',
            other: 'Other'
        };
        breadcrumb.textContent = categoryNames[this.currentCategory] || 'All Documents';
    }

    async downloadDocument(docId) {
        const doc = this.documents.find(d => d.id === docId);
        if (doc) {
            const fileData = window.databaseManager.getFileData(docId);
            
            if (fileData) {
                // Create blob and download
                const blob = new Blob([fileData], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = doc.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // Update download count
                window.databaseManager.updateDocument(docId, {
                    downloads: doc.downloads + 1
                });
                
                this.documents = window.databaseManager.getDocuments();
                this.applyFilters();
                
                window.notificationManager.show(`"${doc.name}" downloaded successfully!`, 'success');
            } else {
                // Simulate download for documents without file data
                window.notificationManager.show(`Downloading "${doc.name}"...`, 'info');
                
                setTimeout(() => {
                    const blob = new Blob(['Sample PDF content'], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = doc.name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    window.databaseManager.updateDocument(docId, {
                        downloads: doc.downloads + 1
                    });
                    
                    this.documents = window.databaseManager.getDocuments();
                    this.applyFilters();
                    
                    window.notificationManager.show(`"${doc.name}" downloaded successfully!`, 'success');
                }, 1000);
            }
        }
    }

    previewDocument(docId) {
        const doc = this.documents.find(d => d.id === docId);
        if (doc) {
            window.previewManager.showPreview(doc);
        }
    }

    shareDocument(docId) {
        const doc = this.documents.find(d => d.id === docId);
        if (doc) {
            const shareUrl = `${window.location.origin}${window.location.pathname}?doc=${docId}`;
            navigator.clipboard.writeText(shareUrl).then(() => {
                window.notificationManager.show('Share link copied to clipboard!', 'success');
            }).catch(() => {
                window.notificationManager.show('Failed to copy share link', 'error');
            });
        }
    }

    deleteDocument(docId) {
        const doc = this.documents.find(d => d.id === docId);
        if (doc) {
            window.deleteManager.showDeleteConfirmation(doc);
        }
    }

    confirmDelete(docId) {
        if (window.databaseManager.deleteDocument(docId)) {
            this.documents = window.databaseManager.getDocuments();
            this.updateCategoryCounts();
            this.applyFilters();
            
            const doc = this.documents.find(d => d.id === docId) || { name: 'Document' };
            window.notificationManager.show(`"${doc.name}" deleted successfully!`, 'success');
            return true;
        }
        return false;
    }

    showContextMenu(event, docId) {
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.left = `${event.pageX}px`;
        contextMenu.style.top = `${event.pageY}px`;
        contextMenu.classList.add('active');
        
        contextMenu.dataset.docId = docId;
        
        const hideContextMenu = (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.classList.remove('active');
                document.removeEventListener('click', hideContextMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', hideContextMenu);
        }, 100);
    }

    addDocument(documentData, fileData) {
        if (window.databaseManager.addDocument(documentData, fileData)) {
            this.documents = window.databaseManager.getDocuments();
            this.updateCategoryCounts();
            this.applyFilters();
            return true;
        }
        return false;
    }
}

// Delete Manager
class DeleteManager {
    constructor() {
        this.deleteModal = document.getElementById('deleteModal');
        this.deleteModalClose = document.getElementById('deleteModalClose');
        this.cancelDelete = document.getElementById('cancelDelete');
        this.confirmDelete = document.getElementById('confirmDelete');
        this.deleteDocumentInfo = document.getElementById('deleteDocumentInfo');
        
        this.currentDocument = null;
        this.init();
    }

    init() {
        this.deleteModalClose.addEventListener('click', () => this.hideDeleteConfirmation());
        this.cancelDelete.addEventListener('click', () => this.hideDeleteConfirmation());
        this.confirmDelete.addEventListener('click', () => this.handleConfirmDelete());
        
        this.deleteModal.addEventListener('click', (e) => {
            if (e.target === this.deleteModal) {
                this.hideDeleteConfirmation();
            }
        });
    }

    showDeleteConfirmation(document) {
        this.currentDocument = document;
        
        this.deleteDocumentInfo.innerHTML = `
            <div class="document-item">
                <div class="document-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="document-info">
                    <div class="document-name">${document.name}</div>
                    <div class="document-meta">
                        <span>by ${document.author}</span>
                        <span>${document.size}</span>
                        <span>${document.downloads} downloads</span>
                    </div>
                </div>
            </div>
        `;
        
        this.deleteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideDeleteConfirmation() {
        this.deleteModal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentDocument = null;
    }

    handleConfirmDelete() {
        if (this.currentDocument) {
            const docName = this.currentDocument.name;
            if (window.documentManager.confirmDelete(this.currentDocument.id)) {
                this.hideDeleteConfirmation();
                window.notificationManager.show(`"${docName}" deleted successfully!`, 'success');
            } else {
                window.notificationManager.show('Failed to delete document', 'error');
            }
        }
    }
}

// Upload Manager
class UploadManager {
    constructor() {
        this.modal = document.getElementById('uploadModal');
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.uploadForm = document.getElementById('uploadForm');
        this.selectedFiles = [];
        
        this.init();
    }

    init() {
        document.getElementById('uploadBtn').addEventListener('click', () => this.showModal());
        document.getElementById('uploadSidebarBtn').addEventListener('click', () => this.showModal());
        
        document.getElementById('modalClose').addEventListener('click', () => this.hideModal());
        document.getElementById('cancelUpload').addEventListener('click', () => this.hideModal());
        
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFiles(Array.from(e.target.files)));
        
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });
        
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });
        
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            this.handleFiles(Array.from(e.dataTransfer.files));
        });
        
        this.uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitUpload();
        });
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
    }

    showModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.resetForm();
    }

    handleFiles(files) {
        const pdfFiles = files.filter(file => file.type === 'application/pdf');
        
        if (pdfFiles.length !== files.length) {
            window.notificationManager.show('Only PDF files are allowed', 'error');
        }
        
        if (pdfFiles.length > 0) {
            this.selectedFiles = pdfFiles;
            this.updateUploadArea();
            
            // Auto-fill title if only one file
            if (pdfFiles.length === 1) {
                const titleInput = document.getElementById('docTitle');
                if (!titleInput.value) {
                    titleInput.value = pdfFiles[0].name.replace('.pdf', '');
                }
            }
        }
    }

    updateUploadArea() {
        if (this.selectedFiles.length > 0) {
            const fileNames = this.selectedFiles.map(f => f.name).join(', ');
            this.uploadArea.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Files Selected</h3>
                <p>${fileNames}</p>
                <small>Click to select different files</small>
            `;
        }
    }

    async submitUpload() {
        const title = document.getElementById('docTitle').value;
        const author = document.getElementById('docAuthor').value;
        const category = document.getElementById('docCategory').value;
        const description = document.getElementById('docDescription').value;

        if (!title || !category) {
            window.notificationManager.show('Please fill in required fields', 'error');
            return;
        }

        if (this.selectedFiles.length === 0) {
            window.notificationManager.show('Please select a PDF file', 'error');
            return;
        }

        const submitBtn = this.uploadForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        submitBtn.disabled = true;

        try {
            // Read file data
            const file = this.selectedFiles[0];
            const fileData = await this.readFileAsArrayBuffer(file);
            
            const newDoc = {
                name: title.endsWith('.pdf') ? title : title + '.pdf',
                author: author || 'Unknown',
                category: category,
                size: this.formatFileSize(file.size),
                sizeBytes: file.size,
                description: description || 'No description provided',
                tags: []
            };
            
            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (window.documentManager.addDocument(newDoc, fileData)) {
                window.notificationManager.show('Document uploaded successfully!', 'success');
                this.hideModal();
            } else {
                window.notificationManager.show('Failed to upload document', 'error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            window.notificationManager.show('Failed to upload document', 'error');
        }
        
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
    }

    readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    resetForm() {
        this.uploadForm.reset();
        this.selectedFiles = [];
        this.uploadArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>Drop PDF files here</h3>
            <p>or <span class="upload-link">click to browse</span></p>
            <small>Maximum file size: 50MB</small>
        `;
    }
}

// Search Manager
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.init();
    }

    init() {
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                window.documentManager.searchDocuments(e.target.value);
            }, 300);
        });
    }
}

// Category Manager
class CategoryManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const categoryItem = e.target.closest('.category-item');
            if (categoryItem) {
                this.setActiveCategory(categoryItem);
                const category = categoryItem.dataset.category;
                window.documentManager.filterByCategory(category);
            }
        });
    }

    setActiveCategory(activeItem) {
        document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }
}

// Sort Manager
class SortManager {
    constructor() {
        this.sortSelect = document.getElementById('sortSelect');
        this.init();
    }

    init() {
        this.sortSelect.addEventListener('change', (e) => {
            window.documentManager.sortDocuments(e.target.value);
        });
    }
}

// Context Menu Manager
class ContextMenuManager {
    constructor() {
        this.contextMenu = document.getElementById('contextMenu');
        this.init();
    }

    init() {
        this.contextMenu.addEventListener('click', (e) => {
            const action = e.target.closest('.context-item')?.dataset.action;
            const docId = parseInt(this.contextMenu.dataset.docId);
            
            if (action && docId) {
                this.handleContextAction(action, docId);
                this.contextMenu.classList.remove('active');
            }
        });
    }

    handleContextAction(action, docId) {
        switch (action) {
            case 'download':
                window.documentManager.downloadDocument(docId);
                break;
            case 'preview':
                window.documentManager.previewDocument(docId);
                break;
            case 'share':
                window.documentManager.shareDocument(docId);
                break;
            case 'info':
                window.documentManager.previewDocument(docId);
                break;
            case 'delete':
                window.documentManager.deleteDocument(docId);
                break;
        }
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize managers in order
    window.databaseManager = new DatabaseManager();
    window.themeManager = new ThemeManager();
    window.notificationManager = new NotificationManager();
    window.previewManager = new PreviewManager();
    window.deleteManager = new DeleteManager();
    window.documentManager = new DocumentManager();
    window.uploadManager = new UploadManager();
    window.searchManager = new SearchManager();
    window.categoryManager = new CategoryManager();
    window.sortManager = new SortManager();
    window.contextMenuManager = new ContextMenuManager();

    // Initialize document manager (loads database)
    await window.documentManager.init();

    // View toggle functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            const documentList = document.getElementById('documentList');
            
            if (view === 'grid') {
                documentList.classList.add('grid-view');
            } else {
                documentList.classList.remove('grid-view');
            }
        });
    });

    // Recent downloads functionality
    document.getElementById('recentBtn').addEventListener('click', () => {
        window.notificationManager.show('Recent downloads feature coming soon!', 'info');
    });

    // Welcome message
    setTimeout(() => {
        window.notificationManager.show('Welcome to PDFHub! Upload, preview, and manage your documents.', 'info');
    }, 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        window.uploadManager.showModal();
    }
    
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = '';
        
        const contextMenu = document.getElementById('contextMenu');
        if (contextMenu.classList.contains('active')) {
            contextMenu.classList.remove('active');
        }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});