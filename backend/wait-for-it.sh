#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available

TIMEOUT=15
QUIET=0
WAIT_HOSTS=0
WAIT_HOSTS_TIMEOUT=15
WAIT_BEFORE=0
WAIT_AFTER=0

usage()
{
  cat << USAGE >&2
Usage:
    $0 host:port [-t timeout] [-- command args]
    -q | --quiet                        Do not output any status messages
    -t TIMEOUT | --timeout=timeout      Timeout in seconds, zero for no timeout
    -- COMMAND ARGS                     Execute command with args after the test finishes
USAGE
  exit 1
}

wait_for()
{
  if [[ "$TIMEOUT" -gt 0 ]]; then
    echo "Waiting for $WAIT_HOSTS $TIMEOUT seconds"
  else
    echo "Waiting for $WAIT_HOSTS without a timeout"
  fi

  for i in `seq $TIMEOUT` ; do
    for HOST in $WAIT_HOSTS ; do
      HOST_PORT=(${HOST//:/ })
      nc -z "${HOST_PORT[0]}" "${HOST_PORT[1]}" >/dev/null 2>&1
      result=$?
      if [[ $result -eq 0 ]] ; then
        if [[ $QUIET -ne 1 ]]; then echo "$HOST is available after $i seconds"; fi
        return 0
      fi
    done
    sleep 1
  done
  echo "Timeout occurred after waiting $TIMEOUT seconds for $WAIT_HOSTS"
  return 1
}

while [ $# -gt 0 ]
do
  case "$1" in
    *:* )
    WAIT_HOSTS="$1"
    shift 1
    ;;
    -q | --quiet)
    QUIET=1
    shift 1
    ;;
    -t)
    TIMEOUT="$2"
    if [[ "$TIMEOUT" = "" ]]; then break; fi
    shift 2
    ;;
    --timeout=*)
    TIMEOUT="${1#*=}"
    shift 1
    ;;
    --wait-before=*)
    WAIT_BEFORE="${1#*=}"
    shift 1
    ;;
    --wait-after=*)
    WAIT_AFTER="${1#*=}"
    shift 1
    ;;
    --)
    shift
    break
    ;;
    --help)
    usage
    ;;
    *)
    echo "Unknown argument: $1"
    usage
    ;;
  esac
done

if [[ "$WAIT_BEFORE" -gt 0 ]]; then
  sleep $WAIT_BEFORE
fi

wait_for

if [[ "$WAIT_AFTER" -gt 0 ]]; then
  sleep $WAIT_AFTER
fi

exec "$@"
