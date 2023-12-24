// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

// Khai báo smart contract
contract AdminContract {
    // Biến lưu trữ địa chỉ của admin
    address public admin;

    // Hàm khởi tạo - chỉ chạy một lần khi triển khai smart contract
    constructor() {
        admin = 0xBE209ABf8cd4A44904656905Cd5702e8377Cb574;
    }

    // Hàm kiểm tra xem một địa chỉ có phải là admin hay không
    function isAdmin(address account) external view returns (bool) {
        return account == admin;
    }
}
