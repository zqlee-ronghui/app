#! /bin/bash
client_timestamp=$(($1/1000))
# shellcheck disable=SC2006
client_date=`date -d @$1 '+%Y-%m-%d %H:%M:%S'`
cur_timestamp=$(($(date +%s%N)/1000000000))

# shellcheck disable=SC2004
delta_t_s=$((($cur_timestamp - $client_timestamp)))

if [ $delta_t_s -gt 60 -o $delta_t_s -lt -60 ]
then
#  date -s "$client_date"
  echo "update time"
fi
echo $delta_t_s