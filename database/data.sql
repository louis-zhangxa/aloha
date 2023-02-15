insert into "users" ("userName", "hashedPassword")
        values ('Demo', '$argon2id$v=19$m=4096,t=3,p=1$QJzHFlFmqxxZxFCKCvWBGA$Bklx5/Bcv2lcn2iuQTLoiyvOOB+xlodqA93OYxZ8PMU');

insert into "favoriteList" ("userId", "placeId")
  values ('1', 'ChIJf00Jr3ERAHwRQYwoFPAnifg'),
          ('1', 'ChIJqWqOqFeifDURpYJ5LnxX-Fw'),
          ('1', 'ChIJXyC7WTu_woARPvVMCHBXd4U');

insert into "comments" ("placeId", "userId", "comment")
  values ('ChIJf00Jr3ERAHwRQYwoFPAnifg', '1', 'Great short uphill paved trail along sea cliffs to observation deck and lighthouse with fantastic views. The whole thing is paved, there is no shade so bring lots of water and go as soon as they open to beat the heat. Lots of lookouts for whales, you can climb down a path and get right next to the lighthouse. '),
          ('ChIJqWqOqFeifDURpYJ5LnxX-Fw', '1', 'Built on a 262 meter peak in Namsan Park, the tower reaches to 480 meters above sea level. When the weather and pollution levels cooperate, visiting the observation tower (370 meters above sea level) allows you to view the entire city and surrounding areas.'),
          ('ChIJXyC7WTu_woARPvVMCHBXd4U', '1', 'A boulevard where the stars of Hollywood are immortalized with bronze star-plaques, embedded in pink and charcoal terrazzo squares.')
