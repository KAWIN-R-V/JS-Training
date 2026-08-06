/*
SL-2 Fake Timers

vi.useFakeTimers() replaces real timers.

Instead of waiting for setTimeout,
vi.runAllTimers() executes all pending timers instantly.

Always call vi.useRealTimers() after the test.

--------------------------------------------------

SL-3 within()

within() limits queries to a specific element.

Useful when multiple cards contain the same text.

--------------------------------------------------

SL-4 Tab Navigation

user.tab() simulates pressing the Tab key.

toHaveFocus() checks which element currently has focus.

--------------------------------------------------

SL-5 Coverage

Line coverage:
Shows how many lines of code were executed.

Branch coverage:
Shows whether every conditional path
(if/else, switch, ternary) was tested.

Branch coverage is more thorough because it ensures
all possible execution paths are tested.
*/