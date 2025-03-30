#include <iomanip>
#include <iostream>
#include <openssl/hmac.h>
#include <openssl/sha.h>
#include <random>
#include <sstream>
#include <string>
#include <vector>
using namespace std;
// Generate a random salt for extra security
std::string generateSalt(size_t length = 16) {
  const std::string chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  std::random_device rd;
  std::mt19937 generator(rd());
  std::uniform_int_distribution<> distrib(0, chars.size() - 1);

  std::string salt;
  for (size_t i = 0; i < length; ++i) {
    salt += chars[distrib(generator)];
  }
  return salt;
}

// Convert binary data to a hex string
std::string toHexString(const unsigned char *data, size_t length) {
  std::stringstream ss;
  for (size_t i = 0; i < length; ++i) {
    ss << std::hex << std::setw(2) << std::setfill('0') << (int)data[i];
  }
  return ss.str();
}

// Compute SHA-256 hash with optional salting
std::string sha256(const std::string &input, const std::string &salt = "") {
  std::string data = input + salt; // Combine input with salt
  unsigned char hash[SHA256_DIGEST_LENGTH];

  if (!SHA256((const unsigned char *)data.c_str(), data.length(), hash)) {
    throw std::runtime_error("SHA-256 computation failed!");
  }

  return toHexString(hash, SHA256_DIGEST_LENGTH);
}

// Compute HMAC-SHA256 for additional integrity
std::string hmac_sha256(const std::string &key, const std::string &message) {
  unsigned char *result;
  unsigned int len = SHA256_DIGEST_LENGTH;

  result = HMAC(EVP_sha256(), key.c_str(), key.length(),
                (unsigned char *)message.c_str(), message.length(), nullptr,
                nullptr);

  if (!result) {
    throw std::runtime_error("HMAC computation failed!");
  }

  return toHexString(result, len);
}

int main() {
  try {
    std::string vote;
    std::cout << "Enter your vote: ";
    std::getline(std::cin, vote); // Secure input handling

    if (vote.empty()) {
      std::cerr << "Error: Vote cannot be empty!" << std::endl;
      return 1;
    }

    std::string salt = generateSalt(); // Generate a random salt
    std::string hashedVote = sha256(vote, salt);
    std::string hmacKey = "SecureHMACKey123"; // Secret key for HMAC
    std::string hmacVote = hmac_sha256(hmacKey, hashedVote);

    std::cout << "\nOriginal Vote: " << vote << std::endl;
    std::cout << "Salt Used: " << salt << std::endl;
    std::cout << "SHA-256 Hashed Vote: " << hashedVote << std::endl;
    std::cout << "HMAC-SHA256 Hash: " << hmacVote << std::endl;

  } catch (const std::exception &e) {
    std::cerr << "Exception: " << e.what() << std::endl;
  }

  return 0;
}
