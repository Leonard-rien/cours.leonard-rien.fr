document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/pages', true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var pages = JSON.parse(xhr.responseText);
          pages.forEach(function(page) {
              var link = document.createElement('a');
              link.href = './' + page; // Ajouter l'extension .html ici si nécessaire
              link.textContent = page.replace('.html', ''); // Retirer l'extension .html du texte du lien
              
              // Déterminer le bloc parent en fonction du dossier de la page
              var parentBlock = determineParentBlock(page);
              if (parentBlock) {
                  parentBlock.appendChild(link);
              } else {
                  console.error("Aucun bloc parent trouvé pour la page : ", page);
              }
          });
      }
  };
  xhr.send();

  // Fonction pour déterminer le bloc parent en fonction du dossier de la page
  function determineParentBlock(page) {
      // Créer un objet de correspondance entre les dossiers et les classes de bloc
      var folderToBlockClass = {
          "Maths": "bloc_Maths",
          "Philosophie": "bloc_Philo",
          // Ajouter d'autres correspondances si nécessaire
      };

      // Extraire le nom du dossier à partir du chemin de la page
      var folderName = page.split("/")[1]; // Le premier élément du chemin après le './'

      // Vérifier si le dossier a une correspondance de classe de bloc
      if (folderToBlockClass.hasOwnProperty(folderName)) {
          // Trouver l'élément bloc avec la classe correspondante
          return document.querySelector('.' + folderToBlockClass[folderName]);
      } else {
          return null; // Aucun bloc parent trouvé
      }
  }
});