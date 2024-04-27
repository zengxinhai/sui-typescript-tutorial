module demo::flash_loan {
  use sui::coin::Coin;
  use demo::pool::{Pool, COIN_Y, COIN_X};

  public struct FlashLoan<phantom T> {
    borrowed_amount: u64,
  }

  // =========== Coin X Flash Loan ===========
  public fun borrow_x(pool: &mut Pool, amount: u64, ctx: &mut TxContext): (Coin<COIN_X>, FlashLoan<COIN_X>) {
    let coin = pool.take_coin_x(amount, ctx);
    let loan = FlashLoan { borrowed_amount: amount };
    (coin, loan)
  }

  public fun repay_x(pool: &mut Pool, coin: Coin<COIN_X>, loan: FlashLoan<COIN_X>) {
    let FlashLoan { borrowed_amount } = loan;
    assert!(borrowed_amount == coin.value(), 0);
    pool.put_coin_x(coin);
  }

  // =========== Coin Y Flash Loan ===========
  public fun borrow_y(pool: &mut Pool, amount: u64, ctx: &mut TxContext): (Coin<COIN_Y>, FlashLoan<COIN_Y>) {
    let coin = pool.take_coin_y(amount, ctx);
    let loan = FlashLoan { borrowed_amount: amount };
    (coin, loan)
  }

  public fun repay_y(pool: &mut Pool, coin: Coin<COIN_Y>, loan: FlashLoan<COIN_Y>) {
    let FlashLoan { borrowed_amount } = loan;
    assert!(borrowed_amount == coin.value(), 0);
    pool.put_coin_y(coin);
  }
}
