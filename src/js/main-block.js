function GenerateTable(data, parameter = "TotalConfirmed"){
    this.data = data;
    const categories = {
      TotalConfirmed: 'Total cases',
      TotalDeaths: 'Total deaths',
      TotalRecovered: 'Total Recovered',
      NewConfirmed: 'New cases',
      NewDeaths: 'New deaths',
      NewRecovered: 'New Recovered',
    }
  
    let activeCategoryId = 0;
    const catArr = Object.entries(categories);
    console.log(catArr);
  
    function sortData(data, parameter) {
      let sortedData = [];
      for (let i = 0; i < data.length; i++) {
        sortedData.push([data[i].Country, data[i][parameter]])
      }
      sortedData.sort(function(a,b) {
        return b[1] - a[1];
      })
      console.log(sortedData)
      return sortedData;
    }
  
    sortData(this.data, this.parameter);

    function generateDropdowns(block, data) {	
        console.log(catArr);
        const dropdownContainer = document.createElement('div');
        dropdownContainer.classList.add('dropdown');
        const ddButton = document.createElement('button');
        ddButton.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
        ddButton.id = 'categoryDropdown';
        ddButton.setAttribute('data-bs-toggle', 'dropdown');
        ddButton.setAttribute('aria-expanded', 'false');
        ddButton.innerText = catArr[activeCategoryId][1];
        const ddList = document.createElement('ul');
        ddList.classList.add('dropdown-menu');
        ddList.setAttribute('aria-labelledby', 'categoryDropdown');
        for (let i = 0; i < catArr.length; i += 1) {
            const ddItem = document.createElement('li');
            const ddItemButton = document.createElement('button');
            ddItemButton.id = i;
            console.log(ddItemButton)
            ddItemButton.classList.add('dropdown-item');
            ddItemButton.setAttribute('type', 'button');
            ddItemButton.innerText = catArr[i][1];
            ddItemButton.addEventListener('click', function() {
                chooseCategory(i, data);
            });
            ddItem.appendChild(ddItemButton);
            ddList.appendChild(ddItem);
        }
        dropdownContainer.appendChild(ddButton);
        dropdownContainer.appendChild(ddList);
        block.appendChild(dropdownContainer);
    }
  }


