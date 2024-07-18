const getRandomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 16).toString(16);
    }
    return color;
};

const letras = document.querySelectorAll('#texto span');
letras.forEach(letra => {
    letra.addEventListener('mouseenter', () => {
        letra.style.color = getRandomColor();
    });

    letra.addEventListener('mouseleave', () => {
        letra.style.color = '';
    });
});

const enlaceInicio = document.getElementById('inicio');
const enlaceNosotros = document.getElementById('nosotros');
const enlaceProductos = document.getElementById('productos');

enlaceInicio.addEventListener('mouseenter', () => {
    const randomColor = getRandomColor();
    enlaceInicio.style.color = randomColor;
});

enlaceInicio.addEventListener('mouseleave', () => {
    enlaceInicio.style.color = '';
});

enlaceNosotros.addEventListener('mouseenter', () => {
    const randomColor = getRandomColor();
    enlaceNosotros.style.color = randomColor;
});

enlaceNosotros.addEventListener('mouseleave', () => {
    enlaceNosotros.style.color = '';
});

enlaceProductos.addEventListener('mouseenter', () => {
    const randomColor = getRandomColor();
    enlaceProductos.style.color = randomColor;
});

enlaceProductos.addEventListener('mouseleave', () => {
    enlaceProductos.style.color = '';
});


