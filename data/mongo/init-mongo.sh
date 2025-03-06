# https://stackoverflow.com/a/53522699/1708243

echo "Doing some Bash script work first"

# create non root user
mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    var user = "$MONGO_INITDB_USERNAME";
    var passwd = "$MONGO_INITDB_PASSWORD";
    db.createUser({user: user, pwd: passwd, roles: ["readWrite"]});
EOF
echo "Doing some more Bash script work afterwards"

# transform json
jq '[.[] | { 
  gene, 
  transcripts: (.transcript | split(", ")),
  samples: (
    [to_entries[] | select(.key | test("exper_rep[0-9]+")) | {type: "EXPERIMENTAL", id: .key, value: .value}] +
    [to_entries[] | select(.key | test("control_rep[0-9]+")) | {type: "CONTROL", id: .key, value: .value}]
  )
}]' /sample.json > /tmp/transformed.json

# import json
mongoimport --uri "mongodb://$MONGO_INITDB_USERNAME:$MONGO_INITDB_PASSWORD@localhost:27017/$MONGO_INITDB_DATABASE" --collection GeneData --jsonArray --file /tmp/transformed.json

# create index for gene for faster search
mongo "mongodb://$MONGO_INITDB_USERNAME:$MONGO_INITDB_PASSWORD@localhost:27017/$MONGO_INITDB_DATABASE" --eval 'db.GeneData.createIndex({ gene: 1 })'
