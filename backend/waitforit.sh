#!/usr/bin/env bash
host="$1"
shift
cmd="$@"

echo "Waiting for MySQL at $host:3306..."

until nc -z "$host" 3306; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 2
done

>&2 echo "MySQL is up - executing command"
exec $cmd

