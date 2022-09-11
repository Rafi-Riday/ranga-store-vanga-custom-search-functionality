// search algorithm
const keyWordGenerator = (text) => {
    const keyWordList = [];
    for (i = 0; i <= text.length - 2; i++) {
        keyWordList.push(`${text[i]}${text[i + 1]}`);
    }
    return keyWordList;
}

document.getElementById("search-btn").addEventListener("click", function () {
    const inputField = document.getElementById("input-value").value;
    const searchedTextArray = keyWordGenerator(inputField.toLowerCase());

    if (inputField.length === 1) {
        const newProducts = arr[0].filter(obj => obj.title.toLowerCase().includes(inputField.toLowerCase()) || obj.category.toLowerCase().includes(inputField.toLowerCase()));
        showProducts(newProducts);
    }
    else if (inputField.length >= 2) {
        const searchData = [];
        for (let obj = 0; obj < arr[0].length; obj++) {
            arr[0][obj].search_ranking = 0;

            const setSearchRanking = (path) => {
                const searchTargetObjectProperty = path;
                const getSearchTarget = new Function(`return arr[0][${obj}]${searchTargetObjectProperty};`);
                const textWhereToSearch = getSearchTarget().toString();
                const textWhereToSearchSplitted = keyWordGenerator(textWhereToSearch.toLowerCase());
                textWhereToSearchSplitted.forEach(searchedText => {
                    searchedTextArray.includes(searchedText) ? arr[0][obj].search_ranking += 1 : void (0);
                    searchedTextArray[0] === searchedText ? arr[0][obj].search_ranking += 1 : void (0);
                    searchedTextArray[searchedTextArray.length - 1] === searchedText ? arr[0][obj].search_ranking += 1 : void (0);
                    searchedTextArray[0].startsWith(searchedText) && searchedTextArray[searchedTextArray.length - 1].endsWith(searchedText) ? arr[0][obj].search_ranking += 2 : void (0);
                });
            }

            setSearchRanking('["title"]');
            setSearchRanking('["category"]');
            // setSearchRanking('["description"]');

            arr[0][obj].search_ranking >= Math.ceil(inputField.length * 2 * 42 / 100) ? searchData.push(arr[0][obj]) : void (0);
            // arr[0][obj].search_ranking >= Math.ceil(inputField.length * 2 * parseFloat(`${inputField.length > 8 ? 40 : inputField.length > 5 ? 55 : 70}`) / 100) ? console.log(arr[0][obj].title) : void (0);
            // arr[0][obj].search_ranking >= Math.ceil(inputField.length * 2 * 45 / 100) ? console.log(arr[0][obj].title) : void (0);
        }
        searchData.sort((a, b) => b.search_ranking - a.search_ranking);
        showProducts(searchData);
    }
    else {
        showProducts(arr[0]);
    }
});

