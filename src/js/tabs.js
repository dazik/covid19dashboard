const tabs = document.querySelectorAll("[data-tab-target]");
const tabsContents = document.querySelectorAll("[data-tab-content]");

function tabsFunction() {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);
            tabsContents.forEach(tabContent => {
                tabContent.classList.remove('active');
            })
            target.classList.add('active');
        })
    })
}

export {tabsFunction}