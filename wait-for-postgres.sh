/bin/sh
#wait-for-postgres.sh

set -e

host="$1"
shift
cmd="$@"
until PGPASSWORD="dante123456" psql -h "$host" -d "library" -U "dante" -c '\q'; do
    echo >&2 "Postgres is unavailable - sleeping"
    sleep 1
done

echo >&2 "Postgres is up - executing command"
exec $cmd
