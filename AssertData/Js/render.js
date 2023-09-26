function showImage(input) {
    const preview = document.getElementById('image-preview');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.innerHTML = `<img  src="${e.target.result}" alt="Selected Image" width="100">`;
        };

        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}