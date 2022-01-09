#!/usr/bin/env bash

diff <(cat test/test_result_with_holdings.json) <(node src/crypto-index-fund.js --cache="./test/latest_crypto.json" --no-colors --holdings="test/holdings.json") &&
diff <(cat test/test_result_with_custom_funds.json) <(node src/crypto-index-fund.js --cache="./test/latest_crypto.json" --funds=2000 --no-colors) &&
diff <(cat test/test_result_without_holdings.json) <(node src/crypto-index-fund.js --cache="./test/latest_crypto.json" --no-colors) &&
diff <(cat test/test_result_selects_80_percent_strategy.json) <(node src/crypto-index-fund.js --cache="./test/latest_crypto.json" --no-colors --strategy="TOP_80_PERCENT_DOMINANCE")

echo "Passed!"
