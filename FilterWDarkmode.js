 const input = document.getElementById('search-input');
  const dropdown = document.getElementById('dropdown');
  const spinner = document.getElementById('spinner');
  const toggle = document.getElementById('theme-toggle');

  const words = ["python", "javascript", "java", "Golang", "Golteb", "Golden", "Teb", "GoltebetLog", "MarkLogan"];

  // Autocomplete and filtering logic
  input.addEventListener('input', function() {
    const val = this.value.toLowerCase();
    dropdown.innerHTML = '';
    if (val === '') {
      dropdown.style.display = 'none';

      // Show all contents if search is empty
      document.querySelectorAll('.contents > div').forEach(item => {
        item.style.display = '';
      });
      return;
    }

    const filteredWords = words.filter(word => word.toLowerCase().includes(val));
    if (filteredWords.length === 0) {
      dropdown.style.display = 'none';
    } else {
      filteredWords.forEach(word => {
        const div = document.createElement('div');
        div.textContent = word;
        div.onclick = () => {
          input.value = word;
          dropdown.style.display = 'none';
          filterContents(word);
        };
        dropdown.appendChild(div);
      });
      dropdown.style.display = 'block';
    }

    // Filter contents live as you type
    filterContents(val);
  });

  function filterContents(searchTerm) {
    const items = document.querySelectorAll('.contents > div');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm.toLowerCase())) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  document.addEventListener('click', function(e) {
    if (!document.getElementById('search-box').contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });


  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const val = input.value.toLowerCase();
      if (val === 'java') {
        spinner.style.display = 'inline-block';
        dropdown.style.display = 'none';
        input.disabled = true;
        setTimeout(() => {
          window.location.href = 'java.html';
        }, 1500);
      }
    }
  });

  // 🌓 Dark Mode Toggle Logic
  toggle.addEventListener('change', () => {
   if (toggle.checked) {
  document.body.style.backgroundColor = 'black';
  document.documentElement.style.backgroundColor = 'black';
  document.body.style.color = 'white';  // <-- add this
} else {
  document.body.style.backgroundColor = 'white';
  document.documentElement.style.backgroundColor = 'white';
  document.body.style.color = 'black';  // <-- add this
}

  });