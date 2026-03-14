// Film Details Modal
function showFilmDetails(filmId) {
    showLoading('filmDetailsContent', 'Loading film details...');
    
    fetch(`/api/film/${filmId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                showError('filmDetailsContent', 'Error loading film details: ' + data.error);
                return;
            }

            const film = data.film;
            const actors = data.actors;
            
            let actorsHtml = '';
            if (actors && actors.length > 0) {
                actorsHtml = actors.map(actor => 
                    `<span class="badge bg-secondary me-1 mb-1">${actor.first_name} ${actor.last_name}</span>`
                ).join('');
            } else {
                actorsHtml = '<span class="text-muted">No actors found</span>';
            }

            const modalContent = `
                <div class="row">
                    <div class="col-md-4">
                        <h6>Title</h6>
                        <p><strong>${escapeHtml(film.title)}</strong></p>
                        
                        <h6>Release Year</h6>
                        <p>${film.release_year || 'N/A'}</p>
                        
                        <h6>Category</h6>
                        <p>${film.category || 'N/A'}</p>
                        
                        <h6>Language</h6>
                        <p>${film.language_name || 'N/A'}</p>
                    </div>
                    <div class="col-md-4">
                        <h6>Rating</h6>
                        <p><span class="badge bg-info">${film.rating || 'N/A'}</span></p>
                        
                        <h6>Length</h6>
                        <p>${film.length || 'N/A'} minutes</p>
                        
                        <h6>Rental Duration</h6>
                        <p>${film.rental_duration || 'N/A'} days</p>
                        
                        <h6>Rental Rate</h6>
                        <p>$${film.rental_rate || '0.00'}</p>
                    </div>
                    <div class="col-md-4">
                        <h6>Replacement Cost</h6>
                        <p>$${film.replacement_cost || '0.00'}</p>
                        
                        <h6>Special Features</h6>
                        <p>${film.special_features || 'N/A'}</p>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h6>Description</h6>
                        <p>${film.description ? escapeHtml(film.description) : 'No description available'}</p>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <h6>Actors</h6>
                        <div>${actorsHtml}</div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12 text-end">
                        <a href="/films/${film.film_id}" class="btn btn-primary btn-sm">View Full Details</a>
                    </div>
                </div>
            `;

            document.getElementById('filmDetailsContent').innerHTML = modalContent;
            const modal = new bootstrap.Modal(document.getElementById('filmDetailsModal'));
            modal.show();
        })
        .catch(error => {
            console.error('Error:', error);
            showError('filmDetailsContent', 'Error loading film details. Please try again.');
        });
}

// Actor Details Modal
function viewActorDetails(actorId) {
    showLoading('actorDetailsContent', 'Loading actor details...');
    
    fetch(`/api/actor/${actorId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                showError('actorDetailsContent', 'Error loading actor details: ' + data.error);
                return;
            }

            const actor = data.actor;
            const films = data.films;
            
            let filmsHtml = '';
            if (films && films.length > 0) {
                filmsHtml = films.map(film => 
                    `<div class="mb-2">
                        <a href="/films/${film.film_id}" class="text-decoration-none">${escapeHtml(film.title)}</a>
                        <span class="badge bg-secondary ms-2">${film.release_year || 'N/A'}</span>
                        <span class="badge bg-info ms-1">${film.rating || 'N/A'}</span>
                    </div>`
                ).join('');
            } else {
                filmsHtml = '<span class="text-muted">No films found</span>';
            }

            const modalContent = `
                <div class="row">
                    <div class="col-md-4">
                        <div class="text-center">
                            <div class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                                 style="width: 80px; height: 80px; font-size: 2rem;">
                                ${actor.first_name.charAt(0)}${actor.last_name.charAt(0)}
                            </div>
                            <h4 class="mt-3">${escapeHtml(actor.first_name)} ${escapeHtml(actor.last_name)}</h4>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <h6>Actor Information</h6>
                        <div class="row mb-3">
                            <div class="col-6">
                                <strong>Actor ID:</strong> ${actor.actor_id}
                            </div>
                            <div class="col-6">
                                <strong>Total Films:</strong> <span class="badge bg-primary">${films.length}</span>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-6">
                                <strong>First Name:</strong> ${escapeHtml(actor.first_name)}
                            </div>
                            <div class="col-6">
                                <strong>Last Name:</strong> ${escapeHtml(actor.last_name)}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <strong>Last Updated:</strong> ${new Date(actor.last_update).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-12">
                        <h6>Filmography</h6>
                        <div style="max-height: 300px; overflow-y: auto;" class="border rounded p-3">
                            ${filmsHtml}
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12 text-end">
                        <button class="btn btn-warning btn-sm" 
                                onclick="editActor(${actor.actor_id}, '${escapeHtml(actor.first_name)}', '${escapeHtml(actor.last_name)}')">
                            Edit Actor
                        </button>
                    </div>
                </div>
            `;

            document.getElementById('actorDetailsContent').innerHTML = modalContent;
            const modal = new bootstrap.Modal(document.getElementById('actorDetailsModal'));
            modal.show();
        })
        .catch(error => {
            console.error('Error:', error);
            showError('actorDetailsContent', 'Error loading actor details. Please try again.');
        });
}

// Edit Actor Function
function editActor(actorId, firstName, lastName) {
    document.getElementById('edit_first_name').value = firstName;
    document.getElementById('edit_last_name').value = lastName;
    
    const form = document.getElementById('editActorForm');
    form.action = `/actors/edit/${actorId}`;
    
    const modal = new bootstrap.Modal(document.getElementById('editActorModal'));
    modal.show();
}

// Utility Functions
function showLoading(elementId, message = 'Loading...') {
    document.getElementById(elementId).innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">${message}</p>
        </div>
    `;
}

function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = `
        <div class="alert alert-danger">
            <i class="fas fa-exclamation-triangle me-2"></i>${message}
        </div>
    `;
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Auto-hide alerts after 5 seconds
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add confirmation for delete actions (only for links without existing onclick)
    const deleteButtons = document.querySelectorAll('a[href*="delete"]:not([onclick])');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    });
});

// Search functionality enhancement
function performSearch(searchTerm) {
    if (searchTerm.length >= 2) {
        // You can add AJAX search functionality here
        console.log('Searching for:', searchTerm);
    }
}

// Export functionality
function exportToCSV() {
    // You can enhance this to handle different export types
    console.log('Exporting data...');
}

// Real-time form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Add event listeners for form validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger mt-3';
                errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Please fill in all required fields.';
                form.appendChild(errorDiv);
            }
        });
    });
});