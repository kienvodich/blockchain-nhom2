// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract HealthRecord {
    //chủ sở hữu smart contract
    address public owner;
    //danh sách các địa chỉ được quyền truy cập thông tin bệnh án
    mapping(address => bool) public authorizedUsers;
    //lưu giữ thông tin bệnh án của mỗi người dùng
    mapping(address => bytes32) private medicalRecords;
    //thông báo khi người dùng được cấp quyền truy cập
    event AccessGranted(address indexed user);
    //thông báo khi hồ sơ bệnh án được cập nhật
    event RecordUpdated(address indexed user, bytes32 record);
    //đảm bảo chỉ chủ sở hữu smart contract mới có thể gọi hàm
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    //đảm bảo chỉ những người được ủy quyền mới có thể gọi hàm
    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender], "You are not authorized to access this record");
        _;
    }
    //thiết lập giá trị ban đầu của smart contract
    constructor() {
        //gán địa chỉ người triển khai smart contract là người khởi tạo
        owner = msg.sender;
        //cấp quyền truy cập cho địa chỉ
        authorizedUsers[msg.sender] = true;
    }
    //cho phép chủ sở hữu cấp quyền truy cập cho một địa chỉ
    function grantAccess(address user) public onlyOwner {
        authorizedUsers[user] = true;
        //emit gửi sự kiện và thông báo về sự kiện thay đổi
        emit AccessGranted(user);
    }
    //cho phép chủ sở hữu thu hồi quyền truy cập của một địa chỉ
    function revokeAccess(address user) public onlyOwner {
        authorizedUsers[user] = false;
    }
    //kiểm tra một địa chỉ đã được cấp quyền hay chưa
    function isAuthorized(address user) public view returns (bool) {
        return authorizedUsers[user];
    }
    //cho phép người dùng cập nhật thông tin bệnh án của mình
    function updateRecord(bytes32 newRecord) public onlyAuthorized {
        medicalRecords[msg.sender] = newRecord;
        //emit gửi sự kiện và thông báo về sự kiện thay đổi
        emit RecordUpdated(msg.sender, newRecord);
    }
    //cho phép người dùng xem thông tin bệnh án của mình
    function getRecord() public view onlyAuthorized returns (bytes32) {
        return medicalRecords[msg.sender];
    }
}
