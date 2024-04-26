module demo::counter {

  public struct Counter has key {
    id: UID,
    value: u64
  }

  fun init(ctx: &mut TxContext) {
    let counter = Counter { id: object::new(ctx), value: 0 };
    transfer::share_object(counter);
  }

  public fun increment(self: &mut Counter) {
    self.value = self.value + 1;
  }
}
