// export const getHashParams = () => {
//     return window.location.hash
//         .substring(1)
//         .split("&")
//         .reduce(function(initial: { [key: string]: any; }, item) {
//             if (item) {
//                 console.log("item:", item);
//                 var parts = item.split("=");
//                 initial[parts[0]] = decodeURIComponent(parts[1]);
//             }
//             console.log("initial: ", initial);
//             return initial;
//         }, {});
// };

export const getHashParams = () => {
    return new URLSearchParams(window.location.hash.substring(1));
};

export const removeHashParamsFromUrl = () => {
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
};
