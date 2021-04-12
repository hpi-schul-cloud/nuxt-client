echo "decrypt secrets"

openssl aes-256-cbc -K $encrypted_bce910623bb2_key -iv $encrypted_bce910623bb2_iv -in travis_rsa.enc -out travis_rsa -d
chmod 600 travis_rsa
