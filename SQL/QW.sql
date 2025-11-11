hot_keys = get_top_keys(big_df, k=10)
hot_big = big_df.filter(col('key').isin(hot_keys))
hot_small = small_df.filter(col('key').isin(hot_keys))
# process hot keys with dedicated cluster or smaller partitioning
normal_join = big_df.join(small_df, 'key', 'inner').exceptAll(hot_big.join(hot_small,'key'))
