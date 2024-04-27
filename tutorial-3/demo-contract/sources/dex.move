module demo::dex {

  use sui::coin::Coin;
  use demo::pool::{Pool, COIN_Y, COIN_X};

  // X:Y = 1:1
  public fun swap_from_x_to_y(pool: &mut Pool, coin_x: Coin<COIN_X>, ctx: &mut TxContext): Coin<COIN_Y> {
    let x_amount = coin_x.value();
    let y_amount = x_amount * 1;
    pool.put_coin_x(coin_x);
    pool.take_coin_y(y_amount, ctx)
  }

  // X:Y = 2:1
  public fun swap_from_y_to_x(pool: &mut Pool, coin_y: Coin<COIN_Y>, ctx: &mut TxContext): Coin<COIN_X> {
    let y_amount = coin_y.value();
    let x_amount = y_amount * 2;
    pool.put_coin_y(coin_y);
    pool.take_coin_x(x_amount, ctx)
  }
}
