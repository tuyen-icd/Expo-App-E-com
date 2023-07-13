import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addToCartSaga(action) {
  console.log('PING1 :>> ');
  const { payload: product } = action;
  console.log('productproduct :>> ', product);

  try {
    const response = yield call(axios.post, 'https://dummyjson.com/carts/add', {
      userId: 1,
      products: [
        {
          id: product.id,
          quantity: product.quantity,
        },
      ],
    });

    // Xử lý các bước sau khi gọi API thành công (nếu cần)
    console.log(response.data);
  } catch (error) {
    // Xử lý lỗi khi gọi API
    console.log(error);
  }
}

function* cartSaga() {
  yield takeEvery(ADD_TO_CART, addToCartSaga);
}

export default cartSaga;