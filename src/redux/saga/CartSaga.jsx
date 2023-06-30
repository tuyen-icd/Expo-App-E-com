import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addToCartSaga(action) {
  try {
      const { itemAddToCart, userId } = action.payload;
      
      console.log('itemAddToCart :>> ', itemAddToCart);
      console.log('userId :>> ', userId);

    // Gọi API để thêm sản phẩm vào giỏ hàng
    const response = yield call(() =>
      axios.post('https://dummyjson.com/carts/add', {
        userId: 1,
        products: [
          {
            id: productId,
            quantity: quantity,
          },
        ],
      })
    );

    const cartData = response.data;
    // Gửi action thành công đến reducer
    yield put(addToCartSuccess(cartData));
  } catch (error) {
    // Gửi action thất bại đến reducer
    yield put(addToCartFailure(error.message));
  }
}

function* cartSaga() {
  yield takeEvery(ADD_TO_CART, addToCartSaga);
}