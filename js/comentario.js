function toggleCommentForm() {
    var formulario = document.getElementById('Comentario');
    formulario.style.display = formulario.style.display === 'block' ? 'none' : 'block';
    var icono = document.querySelector('.coment-icon img');
    icono.style.transform = icono.style.transform === 'scale(1.2)' ? 'scale(1)' : 'scale(1.2)';
}

document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var comentario = document.getElementById('comentario').value;
    if (!comentario.trim()) {
        alert('Por favor, añade un comentario antes de enviar.');
        return;
    }

    fetch('http://localhost:3000/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comentario: comentario })
    })
    
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        alert('Comentario enviado correctamente.');
    })
    
    .catch(error => {
        console.error('Error al enviar comentario:', error);
        alert('Ocurrió un error al enviar el comentario.');
    });
});