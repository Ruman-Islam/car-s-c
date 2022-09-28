const addToLocalStorage = (id) => {
    const shoppingCart = getStoredCart();

    const quantity = shoppingCart[id];
    // if (quantity) {
    //     const newQuantity = quantity + 1;
    //     shoppingCart[id] = newQuantity;
    // } else {
    //     shoppingCart[id] = 1;
    // }
    if (!quantity) {
        shoppingCart[id] = 1;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
}


const getStoredCart = () => {
    let shoppingCart = {};

    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
    }
    return shoppingCart;
}


export {
    getStoredCart,
    addToLocalStorage
}