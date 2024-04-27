module demo::pool {

  use sui::balance::{Self, Supply};
  use sui::coin::Coin;

  public struct COIN_X has drop {}
  public struct COIN_Y has drop {}

  public struct Pool has key {
    id: UID,
    supply_x: Supply<COIN_X>,
    supply_y: Supply<COIN_Y>
  }

  fun init(ctx: &mut TxContext) {
    let pool = Pool {
      id: object::new(ctx),
      supply_x: balance::create_supply(COIN_X {}),
      supply_y: balance::create_supply(COIN_Y {})
    };
    transfer::share_object(pool);
  }

  public(package) fun take_coin_x(pool: &mut Pool, amount: u64, ctx: &mut TxContext): Coin<COIN_X> {
    let balance_x = pool.supply_x.increase_supply(amount);
    balance_x.into_coin(ctx)
  }

  public(package) fun take_coin_y(pool: &mut Pool, amount: u64, ctx: &mut TxContext): Coin<COIN_Y> {
    let balance_y = pool.supply_y.increase_supply(amount);
    balance_y.into_coin(ctx)
  }

  public(package) fun put_coin_x(pool: &mut Pool, coin: Coin<COIN_X>) {
    let balance_x = coin.into_balance();
    pool.supply_x.decrease_supply(balance_x);
  }

  public(package) fun put_coin_y(pool: &mut Pool, coin: Coin<COIN_Y>) {
    let balance_y = coin.into_balance();
    pool.supply_y.decrease_supply(balance_y);
  }
}
