echo "decrypt secrets"

openssl aes-256-cbc -K $encrypted_0ddd2445e49f_key -iv $encrypted_0ddd2445e49f_iv -in travis_rsa.enc -out travis_rsa -d
chmod 600 travis_rsa
