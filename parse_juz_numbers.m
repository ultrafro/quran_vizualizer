%%

txt = fileread('juz_numbers.txt');
lines = strsplit(txt,'\n');

q = [];
for ii = 2:length(lines)
   
    parts = strsplit(lines{ii},char(9));
    hizb = parts{1};
    parts = strsplit(parts{2},' ');
    start = parts{1};
    stop = parts{3};
    
    start_parts = strsplit(start,':');
    start_surah = str2num(start_parts{1}(2:end));
    start_aya = str2num(start_parts{2}(1:end-1));
    
    stop_parts = strsplit(stop,':');
    stop_surah = str2num(stop_parts{1}(2:end));
    if(ii==61)
        stop_aya = str2num(stop_parts{2}(1:end-1));
    else
        stop_aya = str2num(stop_parts{2}(1:end-2));

    end
    
    q(end+1,1)=ceil(str2num(hizb)/2);
    q(end,2) = str2num(hizb);
    q(end,3) = start_surah;
    q(end,4) = start_aya;
    q(end,5) = stop_surah;
    q(end,6) = stop_aya;
end

juz = q;
save('juz.mat','juz');


